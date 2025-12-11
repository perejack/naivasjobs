import { useState, useEffect } from 'react';
import { Key, Copy, Plus, Trash2, Check, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, Button, Input } from '../components/ui';
import './ApiKeysPage.css';

export const ApiKeysPage = () => {
    const { user } = useAuth();
    const [apiKeys, setApiKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [copiedId, setCopiedId] = useState(null);
    const [visibleKeys, setVisibleKeys] = useState({});

    useEffect(() => {
        if (user) {
            fetchApiKeys();
        }
    }, [user]);

    const fetchApiKeys = async () => {
        try {
            const { data, error } = await supabase
                .from('api_keys')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApiKeys(data || []);
        } catch (error) {
            console.error('Error fetching API keys:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateApiKey = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = 'swp_';
        for (let i = 0; i < 32; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    };

    const createApiKey = async () => {
        if (!newKeyName.trim()) return;

        setCreating(true);
        try {
            const apiKey = generateApiKey();
            const { data, error } = await supabase
                .from('api_keys')
                .insert({
                    user_id: user.id,
                    api_key: apiKey,
                    name: newKeyName.trim()
                })
                .select()
                .single();

            if (error) throw error;

            setApiKeys([data, ...apiKeys]);
            setShowModal(false);
            setNewKeyName('');
        } catch (error) {
            console.error('Error creating API key:', error);
        } finally {
            setCreating(false);
        }
    };

    const deleteApiKey = async (id) => {
        if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('api_keys')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setApiKeys(apiKeys.filter(k => k.id !== id));
        } catch (error) {
            console.error('Error deleting API key:', error);
        }
    };

    const copyToClipboard = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const toggleKeyVisibility = (id) => {
        setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const maskKey = (key) => {
        return key.slice(0, 8) + '••••••••••••••••••••' + key.slice(-4);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="api-keys-page">
            <div className="page-header">
                <div>
                    <h1>API Keys</h1>
                    <p>Manage your API keys for integrating SwiftPay into your applications.</p>
                </div>
                <Button icon={<Plus size={20} />} onClick={() => setShowModal(true)}>
                    Create API Key
                </Button>
            </div>

            {/* API Keys List */}
            <div className="api-keys-list">
                {loading ? (
                    <Card>
                        <CardContent className="loading-state">
                            <div className="loading-spinner"></div>
                        </CardContent>
                    </Card>
                ) : apiKeys.length > 0 ? (
                    apiKeys.map((key) => (
                        <Card key={key.id} className="api-key-card">
                            <CardContent>
                                <div className="key-header">
                                    <div className="key-info">
                                        <div className="key-icon">
                                            <Key size={20} />
                                        </div>
                                        <div>
                                            <h3>{key.name}</h3>
                                            <span className="key-date">Created {formatDate(key.created_at)}</span>
                                        </div>
                                    </div>
                                    <div className={`key-status ${key.is_active ? 'active' : 'inactive'}`}>
                                        {key.is_active ? 'Active' : 'Inactive'}
                                    </div>
                                </div>

                                <div className="key-value-container">
                                    <code className="key-value">
                                        {visibleKeys[key.id] ? key.api_key : maskKey(key.api_key)}
                                    </code>
                                    <div className="key-actions">
                                        <button
                                            className="key-action-btn"
                                            onClick={() => toggleKeyVisibility(key.id)}
                                            title={visibleKeys[key.id] ? 'Hide' : 'Show'}
                                        >
                                            {visibleKeys[key.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                        <button
                                            className="key-action-btn"
                                            onClick={() => copyToClipboard(key.api_key, key.id)}
                                            title="Copy"
                                        >
                                            {copiedId === key.id ? <Check size={18} /> : <Copy size={18} />}
                                        </button>
                                        <button
                                            className="key-action-btn danger"
                                            onClick={() => deleteApiKey(key.id)}
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="empty-state">
                            <Key size={48} />
                            <h3>No API Keys</h3>
                            <p>Create your first API key to start integrating SwiftPay.</p>
                            <Button onClick={() => setShowModal(true)}>Create API Key</Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Create API Key</h2>
                        <p>Give your API key a name to help you remember what it's used for.</p>

                        <Input
                            label="Key Name"
                            placeholder="e.g., Production App"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                        />

                        <div className="modal-actions">
                            <Button variant="ghost" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={createApiKey} loading={creating}>
                                Create Key
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
