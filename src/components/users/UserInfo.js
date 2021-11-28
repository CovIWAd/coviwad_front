
export default function UserInfo({label, value}) {
  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <h3 style={{marginRight: 20, marginLeft: 20}}>
        {label}
      </h3>
      <p style={{ fontSize: 16 }} color="text.secondary">
        {value}
      </p>
    </div>
  );
}
