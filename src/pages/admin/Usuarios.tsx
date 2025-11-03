import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

interface User {
  id: number;
  firebaseUid: string;
  email: string;
  nome: string;
  role: string;
  createdAt: string;
}

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    role: 'admin'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Atualizar usuário (sem senha)
        const { password, ...updateData } = formData;
        await api.patch(`/users/${editingUser.id}`, updateData);
        alert('Usuário atualizado com sucesso!');
      } else {
        // Criar novo usuário
        await api.post('/users', formData);
        alert('Usuário cadastrado com sucesso!');
      }
      setShowModal(false);
      resetForm();
      loadUsers();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Erro ao salvar usuário';
      alert(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      nome: user.nome,
      email: user.email,
      password: '',
      role: user.role
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      await api.delete(`/users/${id}`);
      alert('Usuário excluído com sucesso!');
      loadUsers();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Erro ao excluir usuário';
      alert(errorMsg);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      password: '',
      role: 'admin'
    });
    setEditingUser(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Carregando...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Usuários</h1>
            <p className="text-gray-400 mt-1">Gerencie os usuários administradores</p>
          </div>
          <motion.button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            + Novo Usuário
          </motion.button>
        </div>

        {/* Lista de Usuários */}
        <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-900/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Papel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Cadastrado em
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-dark-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-medium">{user.nome}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-300 font-medium transition-colors"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Nenhum usuário cadastrado ainda.
          </div>
        )}
      </div>

      {/* Modal de Cadastro/Edição */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900/50 border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900/50 border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                    required
                    disabled={!!editingUser}
                  />
                  {editingUser && (
                    <p className="text-xs text-gray-500 mt-1">
                      O email não pode ser alterado
                    </p>
                  )}
                </div>

                {!editingUser && (
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Senha *
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-900/50 border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                      required
                      minLength={6}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Papel
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900/50 border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors"
                  >
                    {editingUser ? 'Atualizar' : 'Cadastrar'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
