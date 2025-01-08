
const mockContacts = [
    { id: 1, name: 'John Doe', role: 'Lead Developer', email: 'john.doe@company.com', status: 'Online', phone: '+1 (555) 019-2834' },
    { id: 2, name: 'Jane Smith', role: 'Senior Designer', email: 'jane.smith@company.com', status: 'Busy', phone: '+1 (555) 024-9128' },
    { id: 3, name: 'Mike Johnson', role: 'QA Engineer', email: 'mike.johnson@company.com', status: 'Offline', phone: '+1 (555) 039-4821' },
    { id: 4, name: 'Sarah Wilson', role: 'Project Manager', email: 'sarah.wilson@company.com', status: 'Online', phone: '+1 (555) 041-8931' }
];

function Contacts() {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Online': return 'bg-success';
            case 'Busy': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="mb-4">
                <h1 className="h3 mb-1 text-main font-weight-bold">Contacts</h1>
                <p className="text-muted mb-0">Connect with internal team members and stakeholders</p>
            </div>
            
            <div className="row g-4">
                {mockContacts.map(contact => (
                    <div key={contact.id} className="col-12 col-md-6 col-xxl-3">
                        <div 
                            className="premium-card p-4 d-flex flex-column gap-3"
                            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                        >
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5" style={{ width: '48px', height: '48px' }}>
                                        {contact.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="fs-6 fw-bold mb-0 text-main">{contact.name}</h3>
                                        <span className="text-muted fs-8">{contact.role}</span>
                                    </div>
                                </div>
                                <span className={`badge ${getStatusClass(contact.status)} rounded-pill fs-9 px-2`}>
                                    {contact.status}
                                </span>
                            </div>
                            
                            <div className="d-flex flex-column gap-2 pt-3 border-top border-secondary border-opacity-10 text-muted fs-8">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-envelope"></i>
                                    <span>{contact.email}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-telephone"></i>
                                    <span>{contact.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Contacts;