export default function CustomPopup(props) {
  return (
    <div className="popup-backdrop" onClick={props.onBackdropClick}>
      <div
        className="popup-wrapper"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <p>{props.message}</p>
      </div>
    </div>
  );
}
