const Topbar = ({ fullName }) => {
    return (
      <div className="topbar">
        <span>{fullName}</span>
        <div className="topbar-icons">
          <span>🔔</span>
          <span>👤</span>
        </div>
      </div>
    )
  }
  
  export default Topbar
  