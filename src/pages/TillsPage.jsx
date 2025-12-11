import { useState, useEffect } from 'react';
import { Store, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, Button, Input } from '../components/ui';
import './TillsPage.css';

export const TillsPage = () => {
    const { user } = useAuth();
    const [tills, setTills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        till_number: ''
    });

    useEffect(() => {
        if (user) fetchTills();
    }, [user]);

    const fetchTills = async () => {
        setError('');
        try {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), 10000)
            );

            const fetchPromise = supabase
                .from('tills')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            const { data, error: fetchError } = await Promise.race([fetchPromise, timeoutPromise]);

            if (fetchError) throw fetchError;
            setTills(data || []);
        } catch (err) {
            console.error('Error fetching tills:', err);
            setError(err.message || 'Failed to load tills');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createTill = async () => {
        if (!formData.name || !formData.till_number) {
            alert('Please enter both name and till number');
            return;
        }

        if (!/^\d{5,10}$/.test(formData.till_number)) {
            alert('Till number should be 5-10 digits');
            return;
        }

        setSaving(true);
        setError('');

        const timeoutId = setTimeout(() => {
            setSaving(false);
            setError('Request timed out. Please try again.');
        }, 10000);

        try {
            const { data, error: insertError } = await supabase
                .from('tills')
                .insert({
                    user_id: user.id,
                    name: formData.name,
                    till_number: formData.till_number,
                    is_default: tills.length === 0
                })
                .select()
                .single();

            clearTimeout(timeoutId);

            if (insertError) throw insertError;

            setTills([data, ...tills]);
            setShowModal(false);
            setFormData({ name: '', till_number: '' });
        } catch (err) {
            clearTimeout(timeoutId);
            console.error('Error creating till:', err);
            setError(err.message || 'Failed to create till');
        } finally {
            setSaving(false);
        }
    };

    const deleteTill = async (id) => {
        if (!confirm('Are you sure you want to delete this till?')) return;

        try {
            const { error: deleteError } = await supabase
                .from('tills')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;
            setTills(tills.filter(t => t.id !== id));
        } catch (err) {
            console.error('Error deleting till:', err);
            setError(err.message || 'Failed to delete till');
        }
    };

    const setDefaultTill = async (id) => {
        try {
            await supabase
                .from('tills')
                .update({ is_default: false })
                .eq('user_id', user.id);

            await supabase
                .from('tills')
                .update({ is_default: true })
                .eq('id', id);

            setTills(tills.map(t => ({ ...t, is_default: t.id === id })));
        } catch (err) {
            console.error('Error setting default:', err);
            setError(err.message || 'Failed to set default');
        }
    };

    return (
        <div className="tills-page">
            <div className="page-header">
                <div>
                    <h1>Till Numbers</h1>
                    <p>Add your M-Pesa Till number to receive payments directly to your account.</p>
                </div>
                <Button icon={<Plus size={20} />} onClick={() => setShowModal(true)}>
                    Add Till
                </Button>
            </div>

            {error && (
                <div className="error-banner">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                    <button onClick={() => setError('')}>×</button>
                </div>
            )}

            <div className="info-banner">
                <Store size={20} />
                <div>
                    <strong>How it works:</strong> Add your Till number below. When payments are made through your API key,
                    the money goes directly to your Till. We handle all the M-Pesa integration for you!
                </div>
            </div>

            <div className="tills-list">
                {loading ? (
                    <Card>
                        <CardContent className="loading-state">
                            <div className="loading-spinner"></div>
                            <p>Loading tills...</p>
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
                                            <span className="till-number">Till Number: <strong>{till.till_number}</strong></span>
                                        </div>
                                    </div>
                                    <div className="till-actions">
                                        {till.is_default ? (
                                            <span className="default-badge">
                                                <Check size={14} /> Default
                                            </span>
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
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="empty-state">
                            <Store size={48} />
                            <h3>No Tills Added</h3>
                            <p>Add your M-Pesa Till number to start receiving payments directly to your account.</p>
                            <Button onClick={() => setShowModal(true)}>Add Your First Till</Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Add Till Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => !saving && setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Add Till Number</h2>
                        <p>Enter your M-Pesa Buy Goods Till number. Payments will go directly to this Till.</p>

                        <div className="modal-form">
                            <Input
                                label="Till Name"
                                name="name"
                                placeholder="e.g., My Shop, Main Store"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={saving}
                            />

                            <Input
                                label="Till Number"
                                name="till_number"
                                placeholder="e.g., 7136988"
                                value={formData.till_number}
                                onChange={handleChange}
                                disabled={saving}
                            />

                            <div className="form-note">
                                <strong>Note:</strong> This should be your Buy Goods Till number from Safaricom.
                            </div>
                        </div>

                        <div className="modal-actions">
                            <Button variant="ghost" onClick={() => setShowModal(false)} disabled={saving}>
                                Cancel
                            </Button>
                            <Button onClick={createTill} loading={saving} disabled={saving}>
                                {saving ? 'Adding...' : 'Add Till'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
