import CircularProgress from "@mui/material/CircularProgress";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
  },
};

const Spinner = () => {
  return (
    <div style={styles.root}>
      <CircularProgress />
      <CircularProgress />
    </div>
  );
};

export default Spinner;