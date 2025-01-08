
const mockClients = [
    { id: 1, name: 'Acme Corporation', industry: 'Technology', activeTasks: 5, avatar: 'AC' },
    { id: 2, name: 'Globex Agency', industry: 'Marketing', activeTasks: 2, avatar: 'GA' },
    { id: 3, name: 'Initech Software', industry: 'Finance', activeTasks: 8, avatar: 'IS' },
    { id: 4, name: 'Umbrella Corp', industry: 'Biotech', activeTasks: 0, avatar: 'UC' }
];

function Clients() {
    return (
        <div className="container-fluid p-0">
            <div className="mb-4">
                <h1 className="h3 mb-1 text-main font-weight-bold">Clients</h1>
                <p className="text-muted mb-0">Overview of active clients and project statistics</p>
            </div>
            
            <div className="row g-4">
                {mockClients.map(client => (
                    <div key={client.id} className="col-12 col-md-6 col-xl-3">
                        <div 
                            className="premium-card p-4 d-flex flex-column align-items-center text-center gap-3"
                            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                        >
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style={{ width: '60px', height: '60px' }}>
                                {client.avatar}
                            </div>
                            <div>
                                <h3 className="fs-6 fw-bold mb-1 text-main">{client.name}</h3>
                                <span className="badge bg-secondary bg-opacity-10 text-main rounded-pill fs-8">{client.industry}</span>
                            </div>
                            <div className="w-100 pt-3 border-top border-secondary border-opacity-10 mt-2 d-flex justify-content-around">
                                <div>
                                    <div className="fw-bold text-main">{client.activeTasks}</div>
                                    <div className="text-muted fs-8">Active Tasks</div>
                                </div>
                                <div>
                                    <div className="fw-bold text-main">{client.activeTasks > 0 ? 'Active' : 'Idle'}</div>
                                    <div className="text-muted fs-8">Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Clients;