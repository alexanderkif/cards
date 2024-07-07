import './DialogComponent.scss';

interface DialogComponentProps {
  message: string;
  onOk: () => void;
  onCancel: () => void;
}

function DialogComponent({ message, onOk, onCancel }: DialogComponentProps) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <p>{message}</p>
        <div className="dialog-buttons">
          <button onClick={onOk}>OK</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DialogComponent;
