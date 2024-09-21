import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
  components:{

  }
});
export default responsiveFontSizes(theme);