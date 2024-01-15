import "./Chip.css";

type TChip = {
  label: string;
  onDelete: () => void;
};

const Chip: React.FC<TChip> = ({ label, onDelete }) => {
  return (
    <div className="chip">
      <div id="avatar"></div>
      <div className="chip-label">{label}</div>
      <div>
        <button className="chip-delete" onClick={onDelete}>
          X
        </button>
      </div>
    </div>
  );
};

export default Chip;
