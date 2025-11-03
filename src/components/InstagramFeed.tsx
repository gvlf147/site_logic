import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import api from '../services/api';

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/instagram/posts?limit=6');
      setPosts(response.data);
      setError(false);
    } catch (err) {
      console.error('Erro ao carregar posts do Instagram:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Instagram</span>
            </h2>
            <p className="text-gray-400 text-lg">Carregando posts...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-dark-800/50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || posts.length === 0) {
    return null; // Não mostra a seção se houver erro ou sem posts
  }

  return (
    <section className="py-24 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Siga-nos no Instagram</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Acompanhe nossos projetos, dicas e bastidores
          </p>
          <a
            href="https://instagram.com/logicphire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <Instagram size={20} />
            <span>@logicphire</span>
          </a>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-dark-800"
            >
              {/* Image */}
              <img
                src={post.media_type === 'VIDEO' && post.thumbnail_url ? post.thumbnail_url : post.media_url}
                alt={post.caption || 'Instagram post'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {post.caption && (
                    <p className="text-white text-sm line-clamp-3">
                      {post.caption}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-3 text-primary">
                    <Instagram size={16} />
                    <span className="text-sm">Ver no Instagram</span>
                  </div>
                </div>
              </div>

              {/* Video Badge */}
              {post.media_type === 'VIDEO' && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                  Vídeo
                </div>
              )}

              {/* Carousel Badge */}
              {post.media_type === 'CAROUSEL_ALBUM' && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                  Múltiplas fotos
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
