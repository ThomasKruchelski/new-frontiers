// src/contexts/AuthContext.js
"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  // O "carregando" é crucial! Ele impede que o site pisque a tela de login
  // antes do Firebase ter tempo de verificar se o usuário já estava logado.
  const [carregandoAuth, setCarregandoAuth] = useState(true);

  useEffect(() => {
    // O Firebase fica "escutando" mudanças na autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioLogado(user);
      setCarregandoAuth(false); // Terminou de verificar
    });

    // Limpa o "olheiro" se o componente for desmontado
    return () => unsubscribe();
  }, []);

  // Função utilitária para fazer logout em qualquer lugar do site
  const fazerLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      usuarioLogado,
      carregandoAuth,
      fazerLogout
    }}>
      {/* Só renderiza o site depois que o Firebase der a resposta final */}
      {!carregandoAuth && children}
    </AuthContext.Provider>
  );
}

// Hook atalho
export function useAuth() {
  return useContext(AuthContext);
}