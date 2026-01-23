import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Download, Loader2, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabase';

type UserProfile = {
  auth_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  is_admin?: boolean | null;
};

type LoanApplication = {
  id: string;
  user_id: string;
  loan_amount: number;
  loan_purpose: string;
  repayment_period: number;
  savings_fee: number;
  status: string;
  created_at: string;
  business_registration_path: string | null;
  id_front_path: string | null;
  id_back_path: string | null;
};

type AdminLoanRow = LoanApplication & { profile: UserProfile | null };

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<AdminLoanRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentIsAdminFlag, setCurrentIsAdminFlag] = useState<boolean | null>(null);

  const bucketName = 'loan-documents';

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }

      setCurrentUserId(user.id);

      const { data: adminProfile, error: adminProfileError } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('auth_id', user.id)
        .single();

      if (adminProfileError) throw adminProfileError;

      setCurrentIsAdminFlag(Boolean(adminProfile?.is_admin));

      if (!adminProfile?.is_admin) {
        setIsAdmin(false);
        return;
      }

      setIsAdmin(true);

      const { data: loans, error: loansError } = await supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (loansError) throw loansError;

      const typedLoans = (loans || []) as LoanApplication[];
      const userIds = Array.from(new Set(typedLoans.map((l) => l.user_id)));

      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('auth_id, first_name, last_name, email, phone')
        .in('auth_id', userIds);

      if (profilesError) throw profilesError;

      const profileById = new Map<string, UserProfile>();
      ((profiles || []) as UserProfile[]).forEach((p) => profileById.set(p.auth_id, p));

      const merged: AdminLoanRow[] = typedLoans.map((loan) => ({
        ...loan,
        profile: profileById.get(loan.user_id) || null,
      }));

      setRows(merged);
    } catch (e: any) {
      setError(e?.message || 'Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const businessRows = useMemo(
    () => rows.filter((r: AdminLoanRow) => r.loan_purpose === 'Business'),
    [rows]
  );

  const downloadFile = async (path: string) => {
    const { data, error: signedError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(path, 60);

    if (signedError) throw signedError;

    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 text-gray-900 mb-2">
            <ShieldAlert className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          {error && <p className="text-red-600 mb-3">{error}</p>}
          <p className="text-gray-600 mb-4">You do not have access to this page.</p>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Logged in user id:</strong> {currentUserId || 'Unknown'}</div>
            <div><strong>is_admin:</strong> {currentIsAdminFlag === null ? 'Unknown' : String(currentIsAdminFlag)}</div>
          </div>
          <button
            onClick={() => void load()}
            className="mt-6 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Re-check Access
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">Business loan documents</p>
            </div>
            <button
              onClick={() => void load()}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-red-600">
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {businessRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {row.profile ? `${row.profile.first_name || ''} ${row.profile.last_name || ''}`.trim() || row.profile.email || row.user_id : row.user_id}
                      </div>
                      <div className="text-sm text-gray-500">{row.profile?.email || ''}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{row.profile?.phone || ''}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">KES {Number(row.loan_amount).toLocaleString()}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{row.loan_purpose}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{new Date(row.created_at).toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          disabled={!row.business_registration_path}
                          onClick={() => row.business_registration_path && void downloadFile(row.business_registration_path)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Download className="w-4 h-4" />
                          Certificate
                        </button>
                        <button
                          disabled={!row.id_front_path}
                          onClick={() => row.id_front_path && void downloadFile(row.id_front_path)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Download className="w-4 h-4" />
                          ID Front
                        </button>
                        <button
                          disabled={!row.id_back_path}
                          onClick={() => row.id_back_path && void downloadFile(row.id_back_path)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Download className="w-4 h-4" />
                          ID Back
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {businessRows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-500">
                      No business loan applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
