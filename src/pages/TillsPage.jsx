import { useState, useEffect } from 'react';
import { Store, Plus, Trash2, Check, Eye, EyeOff, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, Button, Input } from '../components/ui';
import './TillsPage.css';

export const TillsPage = () => {
    const { user } = useAuth();
    const [tills, setTills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [visibleFields, setVisibleFields] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        shortcode: '',
        till_number: '',
        passkey: '',
        consumer_key: '',
        consumer_secret: ''
    });

    useEffect(() => {
        if (user) fetchTills();
    }, [user]);

    const fetchTills = async () => {
        try {
            const { data, error } = await supabase
                .from('tills')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTills(data || []);
        } catch (error) {
            console.error('Error fetching tills:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createTill = async () => {
        if (!formData.name || !formData.shortcode || !formData.till_number ||
            !formData.passkey || !formData.consumer_key || !formData.consumer_secret) {
            alert('All fields are required');
            return;
        }

        setSaving(true);
        try {
            const { data, error } = await supabase
                .from('tills')
                .insert({
                    user_id: user.id,
                    name: formData.name,
                    shortcode: formData.shortcode,
                    till_number: formData.till_number,
                    passkey: formData.passkey,
                    consumer_key: formData.consumer_key,
                    consumer_secret: formData.consumer_secret,
                    is_default: tills.length === 0
                })
                .select()
                .single();

            if (error) throw error;

            setTills([data, ...tills]);
            setShowModal(false);
            setFormData({
                name: '',
                shortcode: '',
                till_number: '',
                passkey: '',
                consumer_key: '',
                consumer_secret: ''
            });
        } catch (error) {
            console.error('Error creating till:', error);
            alert('Failed to create till');
        } finally {
            setSaving(false);
        }
    };

    const deleteTill = async (id) => {
        if (!confirm('Are you sure you want to delete this till?')) return;

        try {
            const { error } = await supabase
                .from('tills')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTills(tills.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting till:', error);
        }
    };

    const setDefaultTill = async (id) => {
        try {
            // Remove default from all
            await supabase
                .from('tills')
                .update({ is_default: false })
                .eq('user_id', user.id);

            // Set new default
            await supabase
                .from('tills')
                .update({ is_default: true })
                .eq('id', id);

            setTills(tills.map(t => ({ ...t, is_default: t.id === id })));
        } catch (error) {
            console.error('Error setting default:', error);
        }
    };

    const toggleVisibility = (tillId, field) => {
        const key = `${tillId}-${field}`;
        setVisibleFields(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const maskValue = (value) => {
        if (!value) return '';
        return value.slice(0, 4) + '••••••••' + value.slice(-4);
    };

    return (
        <div className="tills-page">
            <div className="page-header">
                <div>
                    <h1>Till Numbers</h1>
                    <p>Add your M-Pesa Till credentials to receive payments directly.</p>
                </div>
                <Button icon={<Plus size={20} />} onClick={() => setShowModal(true)}>
                    Add Till
                </Button>
            </div>

            <div className="info-banner">
                <Shield size={20} />
                <p>Your credentials are stored securely and used only to process payments to your Till.</p>
            </div>

            <div className="tills-list">
                {loading ? (
                    <Card>
                        <CardContent className="loading-state">
                            <div className="loading-spinner"></div>
                        </CardContent>
                    </Card>
                ) : tills.length > 0 ? (
                    tills.map((till) => (
                        <Card key={till.id} className="till-card">
                            <CardContent>
                                <div className="till-header">
                                    <div className="till-info">
                                        <div className="till-icon">
                                            <Store size={24} />
                                        </div>
                                        <div>
                                            <h3>{till.name}</h3>
                                            <span className="till-number">Till: {till.till_number}</span>
                                        </div>
                                    </div>
                                    <div className="till-actions">
                                        {till.is_default ? (
                                            <span className="default-badge">Default</span>
                                        ) : (
                                            <Button variant="ghost" size="sm" onClick={() => setDefaultTill(till.id)}>
                                                Set Default
                                            </Button>
                                        )}
                                        <button className="delete-btn" onClick={() => deleteTill(till.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="till-details">
                                    <div className="detail-row">
                                        <span className="label">Shortcode</span>
                                        <span className="value">{till.shortcode}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Consumer Key</span>
                                        <div className="secret-value">
                                            <code>
                                                {visibleFields[`${till.id}-key`]
                                                    ? till.consumer_key
                                                    : maskValue(till.consumer_key)}
                                            </code>
                                            <button onClick={() => toggleVisibility(till.id, 'key')}>
                                                {visibleFields[`${till.id}-key`] ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="empty-state">
                            <Store size={48} />
                            <h3>No Tills Added</h3>
                            <p>Add your M-Pesa Till credentials to receive payments directly to your account.</p>
                            <Button onClick={() => setShowModal(true)}>Add Your First Till</Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Add Till Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
                        <h2>Add M-Pesa Till</h2>
                        <p>Enter your Daraja API credentials from the Safaricom Developer Portal.</p>

                        <div className="modal-form">
                            <Input
                                label="Till Name"
                                name="name"
                                placeholder="e.g., My Shop"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <div className="form-row">
                                <Input
                                    label="Business Shortcode"
                                    name="shortcode"
                                    placeholder="e.g., 3581047"
                                    value={formData.shortcode}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Till Number"
                                    name="till_number"
                                    placeholder="e.g., 7136988"
                                    value={formData.till_number}
                                    onChange={handleChange}
                                />
                            </div>

                            <Input
                                label="Passkey"
                                name="passkey"
                                type="password"
                                placeholder="Your Daraja Passkey"
                                value={formData.passkey}
                                onChange={handleChange}
                            />

                            <div className="form-row">
                                <Input
                                    label="Consumer Key"
                                    name="consumer_key"
                                    type="password"
                                    placeholder="Consumer Key"
                                    value={formData.consumer_key}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Consumer Secret"
                                    name="consumer_secret"
                                    type="password"
                                    placeholder="Consumer Secret"
                                    value={formData.consumer_secret}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <Button variant="ghost" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={createTill} loading={saving}>
                                Add Till
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
