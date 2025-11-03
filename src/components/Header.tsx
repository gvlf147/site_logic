import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Header() {
  const location = useLocation()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-dark-900/40 border-b border-primary/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              src="/images/logo.png"
              alt="Logic Logo"
              className="h-16 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            {/* Home navigation links */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#sobre"
                className="text-gray-300 hover:text-primary transition-colors relative group"
              >
                Sobre
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#servicos"
                className="text-gray-300 hover:text-accent-purple transition-colors relative group"
              >
                Serviços
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-purple group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#time"
                className="text-gray-300 hover:text-accent-cyan transition-colors relative group"
              >
                Time
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#contato"
                className="text-gray-300 hover:text-accent-pink transition-colors relative group"
              >
                Contato
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-pink group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Page navigation links */}
            <div className="flex items-center space-x-4">
              <Link
                to="/projetos"
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/projetos'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-gray-300 hover:text-primary hover:bg-primary/10'
                }`}
              >
                Projetos
              </Link>
              <Link
                to="/orcamento"
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === '/orcamento'
                    ? 'bg-secondary text-white'
                    : 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white hover:from-primary/30 hover:to-secondary/30 border border-primary/30'
                }`}
              >
                Orçamento
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}