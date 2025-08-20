import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { 
    Github, Star, GitFork, Users, Search, Code, GitCommit, AlertCircle, 
    Loader2, GitCompare, Building, Calendar, Sparkles, MapPin, Link, 
    Mail, Twitter, Clock, TrendingUp, Award, Zap, Eye, Download
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Cores para o gráfico de linguagens com gradientes mais suaves
const COLORS = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', 
    '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
];

// Componente para exibir um ícone com texto - versão glassmorphism
const InfoCard = ({ icon, text, value, trend }) => (
    <div className="group relative overflow-hidden">
        {/* Background com glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl"></div>
        
        {/* Conteúdo */}
        <div className="relative flex items-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl backdrop-blur-sm border border-white/10">
                {React.cloneElement(icon, { className: "w-6 h-6 text-blue-300" })}
            </div>
            <div className="ml-4 flex-1">
                <p className="text-sm text-gray-300 font-medium">{text}</p>
                <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>
                    {trend && (
                        <div className="flex items-center text-xs text-green-400">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {trend}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// Componente para o gráfico de linguagens com design melhorado
const LanguageChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
                <div className="relative p-8 text-center h-full flex flex-col justify-center">
                    <Code className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Linguagens
                    </h3>
                    <p className="text-gray-400">Nenhuma linguagem encontrada.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
            <div className="relative p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-center">
                    Linguagens Mais Usadas
                </h3>
                <div style={{ width: '100%', height: 350 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => percent > 5 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth={2}
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ 
                                    backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                                    border: '1px solid rgba(255,255,255,0.2)', 
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(20px)'
                                }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value) => [`${(value / 1024).toFixed(2)} KB`, 'Tamanho']}
                            />
                            <Legend 
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Componente para a lista de repositórios populares com design melhorado
const PopularRepos = ({ repos }) => {
    if (!repos || repos.length === 0) {
        return (
            <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
                <div className="relative p-8 text-center h-full flex flex-col justify-center">
                    <Github className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Repositórios Populares
                    </h3>
                    <p className="text-gray-400">Nenhum repositório público encontrado.</p>
                </div>
            </div>
        );
    }
    
    const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

    return (
        <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
            <div className="relative p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Repositórios Populares
                </h3>
                <div className="space-y-4">
                    {sortedRepos.map((repo, index) => (
                        <div key={repo.id} className="group relative overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10"></div>
                            <div className="relative p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <a 
                                            href={repo.html_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="font-bold text-blue-300 hover:text-blue-200 transition-colors text-lg"
                                        >
                                            {repo.name}
                                        </a>
                                    </div>
                                    {repo.private && (
                                        <div className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                                            Privado
                                        </div>
                                    )}
                                </div>
                                
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                    {repo.description || 'Sem descrição disponível.'}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400" /> 
                                            <span className="font-medium">{repo.stargazers_count.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <GitFork className="w-4 h-4 text-green-400" /> 
                                            <span className="font-medium">{repo.forks_count.toLocaleString()}</span>
                                        </div>
                                        {repo.watchers_count > 0 && (
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4 text-blue-400" /> 
                                                <span className="font-medium">{repo.watchers_count.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {repo.language && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                            <span className="text-sm text-gray-300 font-medium">{repo.language}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {repo.topics && repo.topics.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {repo.topics.slice(0, 4).map(topic => (
                                            <span 
                                                key={topic} 
                                                className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Componente para o feed de atividades com design melhorado
const ActivityFeed = ({ events }) => {
    const relevantEvents = events?.filter(e => 
        ['PushEvent', 'CreateEvent', 'WatchEvent', 'ForkEvent', 'IssuesEvent', 'PullRequestEvent'].includes(e.type)
    ).slice(0, 8);

    if (!relevantEvents || relevantEvents.length === 0) {
        return (
            <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
                <div className="relative p-8 text-center h-full flex flex-col justify-center">
                    <Zap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Atividade Recente
                    </h3>
                    <p className="text-gray-400">Nenhuma atividade recente encontrada.</p>
                </div>
            </div>
        );
    }

    const renderEvent = (event) => {
        const repoUrl = `https://github.com/${event.repo.name}`;
        const timeAgo = new Date(event.created_at).toLocaleDateString('pt-BR');
        
        switch (event.type) {
            case 'PushEvent':
                return {
                    icon: <GitCommit className="w-5 h-5 text-green-400" />,
                    text: `Fez push em`,
                    repo: event.repo.name,
                    url: repoUrl,
                    time: timeAgo,
                    color: 'green'
                };
            case 'CreateEvent':
                return {
                    icon: <GitFork className="w-5 h-5 text-purple-400" />,
                    text: `Criou repositório`,
                    repo: event.repo.name,
                    url: repoUrl,
                    time: timeAgo,
                    color: 'purple'
                };
            case 'WatchEvent':
                return {
                    icon: <Star className="w-5 h-5 text-yellow-400" />,
                    text: `Marcou com estrela`,
                    repo: event.repo.name,
                    url: repoUrl,
                    time: timeAgo,
                    color: 'yellow'
                };
            case 'ForkEvent':
                return {
                    icon: <GitFork className="w-5 h-5 text-blue-400" />,
                    text: `Fez fork de`,
                    repo: event.repo.name,
                    url: repoUrl,
                    time: timeAgo,
                    color: 'blue'
                };
            default:
                return null;
        }
    };

    return (
        <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
            <div className="relative p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Atividade Recente
                </h3>
                <div className="space-y-4">
                    {relevantEvents.map(event => {
                        const eventData = renderEvent(event);
                        if (!eventData) return null;
                        
                        return (
                            <div key={event.id} className="group relative overflow-hidden rounded-xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10"></div>
                                <div className="relative flex items-center p-4 transition-all duration-300 hover:scale-[1.02]">
                                    <div className="flex-shrink-0 p-2 bg-gradient-to-br from-white/10 to-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                                        {eventData.icon}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <span>{eventData.text}</span>
                                            <a 
                                                href={eventData.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="font-semibold text-blue-300 hover:text-blue-200 transition-colors"
                                            >
                                                {eventData.repo}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <Clock className="w-3 h-3" />
                                            {eventData.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Componente para as organizações com design melhorado
const Organizations = ({ orgs }) => {
    if (!orgs || orgs.length === 0) return null;

    return (
        <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
            <div className="relative p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Organizações
                </h3>
                <div className="flex flex-wrap gap-4">
                    {orgs.map(org => (
                        <a 
                            href={`https://github.com/${org.login}`} 
                            key={org.id} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title={org.login}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-110"></div>
                            <img 
                                src={org.avatar_url} 
                                alt={org.login} 
                                className="relative w-16 h-16 rounded-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white/20" 
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Componente melhorado para Análise com IA
const AIAnalysis = ({ user, repos, languages }) => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateAnalysis = async () => {
        setIsLoading(true);
        setError('');
        setAnalysis('');

        const popularRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
        const topLanguages = languages.slice(0, 5).map(lang => lang.name).join(', ');

        const prompt = `
            Você é um 'AI Tech Recruiter', um especialista em analisar perfis de desenvolvedores no GitHub. Sua tarefa é criar uma análise concisa e encorajadora sobre o seguinte desenvolvedor.

            **Dados do Desenvolvedor:**
            - **Nome:** ${user.name || user.login}
            - **Bio:** ${user.bio || 'Não informada.'}
            - **Linguagens Mais Usadas:** ${topLanguages}
            - **Repositórios Populares:**
              ${popularRepos.map(r => `- ${r.name}: ${r.description || 'Sem descrição.'}`).join('\n')}

            **Sua Análise (em 2-3 parágrafos curtos):**
            1. **Resumo do Perfil:** Comece com um resumo impactante sobre o perfil do desenvolvedor, destacando suas principais habilidades e áreas de foco com base nos dados.
            2. **Sugestões de Carreira/Projetos:** Com base nas tecnologias que ele mais usa, sugira 1 ou 2 direções de carreira ou tipos de projeto que ele poderia explorar para crescer profissionalmente. Seja específico e criativo.

            Mantenha um tom positivo e profissional, como um coach de carreira. Responda em Português do Brasil. Formate a resposta com parágrafos.
        `;

        try {
            // Simulação de análise de IA (remova a API key real por segurança)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const mockAnalysis = `**Resumo do Perfil:** ${user.name || user.login} demonstra um perfil técnico sólido com foco em ${topLanguages.split(',')[0] || 'desenvolvimento'}, evidenciado pelos ${repos.length} repositórios públicos e engajamento da comunidade. O desenvolvedor mostra consistência na contribuição para projetos open source e possui experiência diversificada em diferentes tecnologias.

**Sugestões de Carreira/Projetos:** Com base no domínio em ${topLanguages}, recomendo explorar oportunidades em desenvolvimento de aplicações escaláveis ou contribuir para projetos de código aberto de maior visibilidade. Considere também especializar-se em arquitetura de software ou liderar iniciativas de mentoria técnica na comunidade.`;
            
            setAnalysis(mockAnalysis);

        } catch (err) {
            console.error(err);
            setError("Não foi possível gerar a análise. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20"></div>
            <div className="relative p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Análise de Perfil com IA
                </h3>
                
                {!analysis && !isLoading && (
                    <button 
                        onClick={generateAnalysis} 
                        className="group relative w-full overflow-hidden rounded-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:scale-105 group-disabled:opacity-50"></div>
                        <div className="relative flex items-center justify-center py-4 px-6 text-white font-bold transition-all duration-300">
                            <Sparkles className="mr-3 w-5 h-5" />
                            Gerar Análise com IA
                        </div>
                    </button>
                )}
                
                {isLoading && (
                    <div className="flex justify-center items-center p-8">
                        <div className="relative">
                            <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
                            <div className="absolute inset-0 w-12 h-12 border-4 border-purple-400/20 rounded-full animate-pulse"></div>
                        </div>
                        <p className="ml-4 text-gray-300 text-lg">Analisando o perfil...</p>
                    </div>
                )}
                
                {error && (
                    <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-red-500/10 backdrop-blur-sm border border-red-500/20"></div>
                        <div className="relative p-4 text-red-300">{error}</div>
                    </div>
                )}
                
                {analysis && (
                    <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10"></div>
                        <div className="relative p-6 text-gray-300 leading-relaxed space-y-4">
                            <ReactMarkdown className="markdown-content">
                                {analysis}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente do painel de um usuário com design glassmorphism
const UserDashboard = ({ data }) => {
    if (!data) return null;
    const { user, repos, events, languages, orgs, totalStars, totalForks } = data;

    // Calcular estatísticas adicionais
    const avgStarsPerRepo = repos.length > 0 ? (totalStars / repos.length).toFixed(1) : 0;
    const totalCommits = events?.filter(e => e.type === 'PushEvent').length || 0;
    const accountAge = Math.floor((new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 365));

    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            {/* Perfil do Usuário com glassmorphism */}
            <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
                <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl"></div>
                        <img 
                            src={user.avatar_url} 
                            alt={user.name} 
                            className="relative w-40 h-40 rounded-full border-4 border-white/20 shadow-2xl" 
                        />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center border-4 border-gray-900">
                            <Github className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    
                    <div className="text-center lg:text-left flex-1">
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
                            {user.name || user.login}
                        </h1>
                        <a 
                            href={user.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xl text-blue-300 hover:text-blue-200 transition-colors flex items-center justify-center lg:justify-start gap-2 mb-4"
                        >
                            @{user.login}
                            <Link className="w-4 h-4" />
                        </a>
                        
                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-4">
                            {user.bio || 'Este desenvolvedor prefere manter um ar de mistério...'}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-400">
                            {user.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{user.location}</span>
                                </div>
                            )}
                            {user.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>{user.email}</span>
                                </div>
                            )}
                            {user.twitter_username && (
                                <div className="flex items-center gap-2">
                                    <Twitter className="w-4 h-4" />
                                    <span>@{user.twitter_username}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Entrou em {new Date(user.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estatísticas principais */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <InfoCard 
                    icon={<Users />} 
                    text="Seguidores" 
                    value={user.followers} 
                />
                <InfoCard 
                    icon={<GitFork />} 
                    text="Repositórios" 
                    value={user.public_repos} 
                />
                <InfoCard 
                    icon={<Star />} 
                    text="Estrelas Totais" 
                    value={totalStars} 
                />
                <InfoCard 
                    icon={<GitFork />} 
                    text="Forks Totais" 
                    value={totalForks} 
                />
                <InfoCard 
                    icon={<Award />} 
                    text="Média de Estrelas" 
                    value={avgStarsPerRepo} 
                />
                <InfoCard 
                    icon={<Clock />} 
                    text="Anos no GitHub" 
                    value={accountAge} 
                />
            </div>

            {/* Análise com IA */}
            <AIAnalysis user={user} repos={repos} languages={languages} />

            {/* Gráfico de Linguagens e Atividade Recente */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <LanguageChart data={languages} />
                <ActivityFeed events={events} />
            </div>
            
            {/* Organizações */}
            <Organizations orgs={orgs} />

            {/* Repositórios Populares */}
            <PopularRepos repos={repos} />
        </div>
    );
};

// Componente Principal da Aplicação com design melhorado
export default function App() {
    const [username1, setUsername1] = useState('');
    const [username2, setUsername2] = useState('');
    const [userData1, setUserData1] = useState(null);
    const [userData2, setUserData2] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCompareMode, setIsCompareMode] = useState(false);

    const fetchGitHubData = useCallback(async (username) => {
        try {
            // Busca os dados primários em paralelo
            const [userRes, reposRes, eventsRes, orgsRes] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
                fetch(`https://api.github.com/users/${username}/events?per_page=100`),
                fetch(`https://api.github.com/users/${username}/orgs`)
            ]);

            if (!userRes.ok) throw new Error(`Usuário "${username}" não encontrado.`);

            const user = await userRes.json();
            const repos = await reposRes.json();
            const events = await eventsRes.json();
            const orgs = await orgsRes.json();

            // Calcula estatísticas totais a partir dos repositórios
            const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
            const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

            // Busca os dados de linguagens para cada repositório em paralelo
            const langPromises = repos.map(repo => 
                fetch(repo.languages_url).then(res => res.ok ? res.json() : {})
            );
            
            const languagesData = await Promise.all(langPromises);

            // Agrega as linguagens de todos os repositórios
            const languageStats = {};
            languagesData.forEach(repoLangs => {
                Object.entries(repoLangs).forEach(([lang, bytes]) => {
                    languageStats[lang] = (languageStats[lang] || 0) + bytes;
                });
            });

            // Converte para array e ordena por uso
            const languages = Object.entries(languageStats)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 10);

            return { user, repos, events, languages, orgs, totalStars, totalForks };

        } catch (error) {
            throw new Error(error.message || 'Erro ao buscar dados do GitHub.');
        }
    }, []);

    const handleSearch = async (username, setUserData) => {
        if (!username.trim()) {
            setError('Por favor, digite um nome de usuário.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const data = await fetchGitHubData(username.trim());
            setUserData(data);
        } catch (err) {
            setError(err.message);
            setUserData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
            {/* Background decorativo */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header melhorado */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            GitHub Analytics
                        </h1>
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-full"></div>
                    </div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Descubra insights profundos sobre perfis do GitHub com análise avançada e visualizações interativas
                    </p>
                </div>

                {/* Controles de busca melhorados */}
                <div className="relative overflow-hidden rounded-3xl mb-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>
                    <div className="relative p-8">
                        <div className="flex flex-col lg:flex-row gap-6 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Nome de usuário do GitHub
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl"></div>
                                    <input
                                        type="text"
                                        value={username1}
                                        onChange={(e) => setUsername1(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(username1, setUserData1)}
                                        placeholder="Ex: octocat"
                                        className="relative w-full px-6 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl text-lg"
                                    />
                                </div>
                            </div>
                            
                            <button
                                onClick={() => handleSearch(username1, setUserData1)}
                                disabled={isLoading}
                                className="group relative overflow-hidden rounded-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:scale-105 group-disabled:opacity-50"></div>
                                <div className="relative flex items-center justify-center px-8 py-4 text-white font-bold transition-all duration-300">
                                    {isLoading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Search className="w-6 h-6 mr-3" />
                                            Analisar Perfil
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Exibição de erro melhorada */}
                {error && (
                    <div className="relative overflow-hidden rounded-2xl mb-8">
                        <div className="absolute inset-0 bg-red-500/10 backdrop-blur-xl border border-red-500/20"></div>
                        <div className="relative flex items-center p-6 text-red-300">
                            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                            <span className="text-lg">{error}</span>
                        </div>
                    </div>
                )}

                {/* Dashboard do usuário */}
                {userData1 && <UserDashboard data={userData1} />}
            </div>

            {/* Estilos CSS adicionais para animações */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6 {
                    font-weight: bold;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                    color: #E0E7FF; /* light blue-gray */
                }
                .markdown-content h1 { font-size: 2.25em; }
                .markdown-content h2 { font-size: 1.875em; }
                .markdown-content h3 { font-size: 1.5em; }
                .markdown-content p {
                    margin-bottom: 1em;
                    line-height: 1.6;
                }
                .markdown-content strong {
                    color: #FFFFFF;
                }
                .markdown-content ul {
                    list-style-type: disc;
                    margin-left: 1.5em;
                    margin-bottom: 1em;
                }
                .markdown-content ol {
                    list-style-type: decimal;
                    margin-left: 1.5em;
                    margin-bottom: 1em;
                }
                .markdown-content li {
                    margin-bottom: 0.5em;
                }
                .markdown-content a {
                    color: #93C5FD; /* blue-300 */
                    text-decoration: underline;
                }
                .markdown-content code {
                    background-color: rgba(129, 140, 248, 0.2); /* indigo-400 with transparency */
                    padding: 0.2em 0.4em;
                    border-radius: 0.3em;
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
                }
                .markdown-content pre {
                    background-color: rgba(17, 24, 39, 0.7); /* gray-900 with transparency */
                    padding: 1em;
                    border-radius: 0.5em;
                    overflow-x: auto;
                    margin-bottom: 1em;
                }
                .markdown-content pre code {
                    background-color: transparent;
                    padding: 0;
                    border-radius: 0;
                }
            `}</style>
        </div>
    );
}

