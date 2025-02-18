import './FishList.css';

function FishList({ data, onDelete }) {
  return (
    <div className="list mt-3 mb-3">
      {data.map((item) => {
        return (
          <div className="item" key={item.id}>
            <span>
              {item.name} / {item.size}
            </span>
            <button className="btn-secondary" onClick={() => onDelete(item.id)}>
              odebrat
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default FishList;
