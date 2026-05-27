import './StatCard.css';
const StatCard = ({ value, label, type }) => {
  return (
    <div className={`stat-card ${type}`}>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
};

export default StatCard;