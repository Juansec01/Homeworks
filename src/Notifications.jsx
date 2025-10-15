import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "./NotificationsSlice";

export const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  return (
    <div className="notifications">
      <h2>📲  Notificaciones</h2>
      {notifications.length === 0 ? (
        <p>No hay notificaciones.</p>
      ) : (
        <>
          <ul>
            {notifications.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
          <button onClick={() => dispatch(removeNotification())}>
            Quitar más reciente
          </button>
        </>
      )}
    </div>
  );
};
