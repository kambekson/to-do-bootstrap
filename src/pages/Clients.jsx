
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ClientModal from '../components/ClientModal';

function Clients() {
    const { searchQuery, tasks = [], clients = [] } = useOutletContext() || {
        searchQuery: '',
        tasks: [],
        clients: []
    };

    const [selectedClient, setSelectedClient] = useState(null);

    // Filter clients based on search query
    const filteredClients = clients.filter(client => {
        const query = searchQuery ? searchQuery.toLowerCase().trim() : '';
        if (!query) return true;
        return (
            client.name.toLowerCase().includes(query) ||
            client.industry.toLowerCase().includes(query) ||
            client.email?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="container-fluid p-0">
            <div className="mb-4">
                <h1 className="h3 mb-1 text-main font-weight-bold">Clients</h1>
                <p className="text-muted mb-0">Overview of active clients, project progress, and task metrics</p>
            </div>
            
            <div className="row g-4">
                {filteredClients.map(client => {
                    // Compute dynamic stats based on tasks associated with this client
                    const clientTasks = tasks.filter(t => t.clientName === client.name);
                    const totalTasks = clientTasks.length;
                    const activeTasks = clientTasks.filter(t => t.status === 'In progress' || t.status === 'Frozen').length;
                    const closedTasks = clientTasks.filter(t => t.status === 'Closed').length;
                    const progress = totalTasks > 0 ? Math.round((closedTasks / totalTasks) * 100) : 0;

                    return (
                        <div key={client.id} className="col-12 col-md-6 col-xl-3">
                            <div 
                                className="premium-card p-4 d-flex flex-column align-items-center text-center gap-3"
                                style={{ 
                                    backgroundColor: 'var(--bg-card)', 
                                    border: '1px solid var(--border-color)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedClient(client)}
                            >
                                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style={{ width: '60px', height: '60px' }}>
                                    {client.avatar}
                                </div>
                                <div className="w-100">
                                    <h3 className="fs-6 fw-bold mb-1 text-main text-truncate">{client.name}</h3>
                                    <span className="badge bg-secondary bg-opacity-10 text-main rounded-pill fs-8">{client.industry}</span>
                                </div>

                                {/* Dynamic Progress Bar */}
                                <div className="w-100 mt-2">
                                    <div className="d-flex justify-content-between fs-8 mb-1">
                                        <span className="text-muted">Completion Rate</span>
                                        <span className="fw-bold text-main">{progress}%</span>
                                    </div>
                                    <div className="progress" style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px' }}>
                                        <div 
                                            className="progress-bar" 
                                            role="progressbar" 
                                            style={{ 
                                                width: `${progress}%`, 
                                                transition: 'width 0.4s ease',
                                                backgroundColor: 'var(--primary-color)',
                                                borderRadius: '3px'
                                            }} 
                                            aria-valuenow={progress} 
                                            aria-valuemin="0" 
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>

                                <div className="w-100 pt-3 border-top border-secondary border-opacity-10 mt-1 d-flex justify-content-around">
                                    <div>
                                        <div className="fw-bold text-main">{activeTasks}</div>
                                        <div className="text-muted fs-8">Active Tasks</div>
                                    </div>
                                    <div>
                                        <div className="fw-bold text-main">{totalTasks}</div>
                                        <div className="text-muted fs-8">Total Tasks</div>
                                    </div>
                                    <div>
                                        <div className="fw-bold text-main">{activeTasks > 0 ? 'Active' : 'Idle'}</div>
                                        <div className="text-muted fs-8">Status</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filteredClients.length === 0 && (
                    <div className="col-12 text-center text-muted py-5">
                        <i className="bi bi-people fs-2 opacity-50 mb-2 d-block"></i>
                        <span>No clients match your search query.</span>
                    </div>
                )}
            </div>

            {selectedClient && (
                <ClientModal 
                    client={selectedClient} 
                    tasks={tasks} 
                    onClose={() => setSelectedClient(null)} 
                />
            )}
        </div>
    );
}

export default Clients;