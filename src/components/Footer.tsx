import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo e Descrição */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <img 
                src="/images/logo.png" 
                alt="Logic" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400 mt-2 max-w-md leading-relaxed">
                Transformamos ideias em soluções digitais inovadoras. 
                Desenvolvimento web, mobile e desktop com tecnologia de ponta.
              </p>
            </div>
          </motion.div>
          
          {/* Navegação */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3">
              {[
                { label: 'Início', href: '/' },
                { label: 'Sobre', href: '#sobre' },
                { label: 'Serviços', href: '#servicos' },
                { label: 'Projetos', href: '/projetos' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contato */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-center gap-2">
                <span className="text-primary">📧</span> contato@logicphire.com.br
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <span className="text-primary">📱</span> (85) 99793-5406
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <span className="text-primary">📱</span> (85) 98740-0122
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Fortaleza, CE</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8"></div>
        
        {/* Copyright */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            © 2025 Logic. Todos os direitos reservados. 
            <span className="text-primary"> Desenvolvido com 💜</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
