import { makeStyles } from "./makesStyles";
import Employees from "./pages/Employee/Employees";

const useStyles = makeStyles<{}>({ name: { App } })((theme) => ({
  root:{
    maxWidth: theme.appWrapper.maxWidth,
    margin: theme.appWrapper.margin,
  },
}));

function App() {
  const { classes } = useStyles({});

  return (
      <div className={classes.root}>
        <Employees/>
      </div>
  );
}

export default App;
