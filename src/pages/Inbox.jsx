
const mockMessages = [
    { id: 1, sender: 'John Doe', action: 'completed task', target: 'Configure Vite bundler and ESLint rules', time: '10 minutes ago', unread: true },
    { id: 2, sender: 'Jane Smith', action: 'assigned new task', target: 'Design UI mockup and style guide', time: '2 hours ago', unread: true },
    { id: 3, sender: 'Sarah Wilson', action: 'left comments on', target: 'Verify application performance benchmarks', time: '1 day ago', unread: false },
    { id: 4, sender: 'System Agent', action: 'archived old server logs from', target: 'Dev server container', time: '3 days ago', unread: false }
];

function Inbox() {
    return (
        <div className="container-fluid p-0">
            <div className="mb-4">
                <h1 className="h3 mb-1 text-main font-weight-bold">Inbox</h1>
                <p className="text-muted mb-0">Track real-time team activities and updates</p>
            </div>
            
            <div 
                className="premium-card p-3 d-flex flex-column gap-2"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
                {mockMessages.map(msg => (
                    <div 
                        key={msg.id} 
                        className={`d-flex align-items-start justify-content-between p-3 rounded-3 transition ${msg.unread ? 'bg-primary bg-opacity-10' : ''}`}
                        style={{ borderBottom: '1px solid var(--border-color)' }}
                    >
                        <div className="d-flex align-items-center gap-3">
                            <div className={`rounded-circle d-flex align-items-center justify-content-center text-white ${msg.unread ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '40px', height: '40px' }}>
                                <i className={`bi ${msg.unread ? 'bi-chat-left-dots-fill' : 'bi-chat-left'} fs-6`}></i>
                            </div>
                            <div>
                                <p className="mb-0 text-main fs-7">
                                    <span className="fw-semibold">{msg.sender}</span> {msg.action} <span className="fw-medium text-primary">&ldquo;{msg.target}&rdquo;</span>
                                </p>
                                <span className="text-muted fs-8">{msg.time}</span>
                            </div>
                        </div>
                        {msg.unread && (
                            <span className="badge bg-primary rounded-pill fs-9 py-1 px-2">New</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Inbox;