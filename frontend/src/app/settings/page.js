export default function SettingsPage() {
  return (
    <div style={styles.page}>

      {/* Título */}
      <h1 style={styles.title}>Configuración del Sistema</h1>
      <p style={styles.subtitle}>
        Administre sus credenciales, preferencias de interfaz y parámetros de
        operación para la flota de TransFlow.
      </p>

      {/* Tarjeta Perfil */}
      <div style={styles.card}>
        <div style={styles.profileRow}>
          <div style={styles.avatarWrap}>
            <div style={styles.avatar}>JR</div>
            <span style={styles.cameraBtn}>📷</span>
          </div>
          <div style={styles.profileInfo}>
            <strong style={styles.profileName}>Javier Rodríguez</strong>
            <span style={styles.profileMeta}>
              Gestor de Operaciones Senior • ID: TF-4492
            </span>
            <button style={styles.changePhotoBtn}>Cambiar Foto de Perfil</button>
          </div>
          <div style={styles.statusBadge}>
            <span style={styles.statusLabel}>ESTADO</span>
            <span style={styles.statusValue}>EN LÍNEA</span>
          </div>
        </div>
      </div>

      {/* Tarjeta Información Personal */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>👤 Información Personal</h2>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>NOMBRE COMPLETO</label>
            <input style={styles.input} defaultValue="Javier Rodriguez" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>CORREO ELECTRÓNICO</label>
            <input style={styles.input} defaultValue="j.rodriguez@transflow.tech" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>ROL OPERATIVO</label>
            <input style={{ ...styles.input, backgroundColor: "#f1f3f5" }} defaultValue="Fleet Manager" disabled />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>NÚMERO DE TELÉFONO</label>
            <input style={styles.input} defaultValue="+34 612 345 678" />
          </div>
        </div>
        <div style={styles.saveRow}>
          <button style={styles.saveBtn}>Guardar Cambios</button>
        </div>
      </div>

      {/* Tarjeta Preferencias */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>⊞ Preferencias del Sistema</h2>
        <div style={styles.prefsGrid}>
          <div>
            <label style={styles.label}>IDIOMA Y REGIÓN</label>
            <p style={styles.prefDesc}>
              Personalice el idioma de la interfaz y formatos de datos.
            </p>
            <select style={styles.select}>
              <option>Español (España)</option>
              <option>Español (México)</option>
              <option>English (US)</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>INTERFAZ VISUAL</label>
            <p style={styles.prefDesc}>
              Configure la densidad de datos y el modo visual.
            </p>
            <div style={styles.themeToggle}>
              <button style={{ ...styles.themeBtn, ...styles.themeBtnActive }}>
                ☀️ CLARO
              </button>
              <button style={{ ...styles.themeBtn, ...styles.themeBtnDark }}>
                🌙 OSCURO
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

const styles = {
  page: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#1a1a2e",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "700",
    margin: "0 0 0.4rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "1.5rem",
    lineHeight: "1.5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1.5rem",
    marginBottom: "1.25rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  profileRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  avatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "10px",
    backgroundColor: "#1a2744",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    fontWeight: "700",
  },
  cameraBtn: {
    position: "absolute",
    bottom: "-6px",
    right: "-6px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  profileName: {
    fontSize: "1.05rem",
    fontWeight: "700",
  },
  profileMeta: {
    fontSize: "0.82rem",
    color: "#666",
  },
  changePhotoBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#1a56db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.35rem 0.85rem",
    fontSize: "0.8rem",
    cursor: "pointer",
    marginTop: "0.25rem",
  },
  statusBadge: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "0.5rem 0.85rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
    marginLeft: "auto",
  },
  statusLabel: {
    fontSize: "0.65rem",
    color: "#888",
    fontWeight: "600",
    letterSpacing: "0.05em",
  },
  statusValue: {
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#1a56db",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    marginBottom: "1.25rem",
    color: "#1a1a2e",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  label: {
    fontSize: "0.7rem",
    fontWeight: "700",
    color: "#888",
    letterSpacing: "0.05em",
  },
  input: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0.55rem 0.75rem",
    fontSize: "0.9rem",
    color: "#222",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  saveRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1.25rem",
  },
  saveBtn: {
    backgroundColor: "#1a2744",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.6rem 1.4rem",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  prefsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
  },
  prefDesc: {
    fontSize: "0.8rem",
    color: "#888",
    margin: "0.3rem 0 0.75rem",
  },
  select: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0.55rem 0.75rem",
    fontSize: "0.9rem",
    width: "100%",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  themeToggle: {
    display: "flex",
    gap: "0.5rem",
  },
  themeBtn: {
    flex: 1,
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.8rem",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#333",
  },
  themeBtnActive: {
    border: "2px solid #1a56db",
    color: "#1a56db",
  },
  themeBtnDark: {
    backgroundColor: "#2d2d2d",
    color: "#aaa",
    border: "1px solid #444",
  },
};