import './DialogComponent.scss';

interface DialogComponentProps {
  message: string;
  showCancel: boolean;
  onOk: () => void;
  onCancel: () => void;
}

function DialogComponent({
  message,
  showCancel,
  onOk,
  onCancel,
}: DialogComponentProps) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <p>{message}</p>
        <div className="dialog-buttons">
          <button onClick={onOk}>OK</button>
          {showCancel && <button onClick={onCancel}>Cancel</button>}
        </div>
      </div>
    </div>
  );
}

export default DialogComponent;
