import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import api from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projetos: 0,
    orcamentos: { total: 0, pendentes: 0, emAnalise: 0, respondidos: 0 },
    contatos: { total: 0, novos: 0, lidos: 0, respondidos: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projectsRes, orcamentosRes, contatosRes] = await Promise.all([
        api.get('/projects'),
        api.get('/orcamentos/stats'),
        api.get('/contatos/stats'),
      ]);

      setStats({
        projetos: projectsRes.data.length || 0,
        orcamentos: orcamentosRes.data || {},
        contatos: contatosRes.data || {},
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Total de Projetos',
      value: stats.projetos,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'from-purple-500 to-primary',
      link: '/admin/projetos',
    },
    {
      title: 'Orçamentos Pendentes',
      value: stats.orcamentos.pendentes,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-yellow-500 to-orange-500',
      link: '/admin/orcamentos',
      badge: stats.orcamentos.pendentes > 0 ? 'Novo' : undefined,
    },
    {
      title: 'Total de Orçamentos',
      value: stats.orcamentos.total,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      link: '/admin/orcamentos',
    },
    {
      title: 'Novos Contatos',
      value: stats.contatos.novos,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500',
      link: '/admin/contatos',
      badge: stats.contatos.novos > 0 ? 'Novo' : undefined,
    },
    {
      title: 'Gerenciar Usuários',
      value: '👥',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'from-pink-500 to-rose-500',
      link: '/admin/usuarios',
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Visão geral do sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={card.link}>
                <div className="relative bg-dark-800 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}></div>

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${card.color} rounded-xl text-white`}>
                        {card.icon}
                      </div>
                      {card.badge && (
                        <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold rounded-full">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">{card.title}</h3>
                    <p className="text-4xl font-bold text-white">{card.value}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-dark-800 border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/projetos"
              className="flex items-center gap-4 p-4 bg-dark-900 hover:bg-white/5 border border-white/10 rounded-xl transition-all group"
            >
              <div className="p-3 bg-primary/20 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Novo Projeto</h3>
                <p className="text-sm text-gray-400">Adicionar ao portfólio</p>
              </div>
            </Link>

            <Link
              to="/admin/orcamentos"
              className="flex items-center gap-4 p-4 bg-dark-900 hover:bg-white/5 border border-white/10 rounded-xl transition-all group"
            >
              <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Ver Orçamentos</h3>
                <p className="text-sm text-gray-400">{stats.orcamentos.pendentes} pendentes</p>
              </div>
            </Link>

            <Link
              to="/admin/contatos"
              className="flex items-center gap-4 p-4 bg-dark-900 hover:bg-white/5 border border-white/10 rounded-xl transition-all group"
            >
              <div className="p-3 bg-green-500/20 rounded-xl text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Ver Contatos</h3>
                <p className="text-sm text-gray-400">{stats.contatos.novos} novos</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
