import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch } from "react-redux";
import { isLogin as actionIslogin } from "../../redux/actions/userAction";

export default function SignIn() {
  const dispatch = useDispatch();
  const [required, SetRequired] = React.useState({
    email: false,
    password: false,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let isEmail,
      isPass = false;
    if (!data.get("email").trim()) {
      isEmail = true;
    }
    if (!data.get("password").trim()) {
      isPass = true;
    }
    SetRequired({
      email: isEmail,
      password: isPass,
    });
    console.log(required);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className="c-login">
      <span
        className="c-login__close"
        onClick={() => dispatch(actionIslogin())}
      >
        <CancelIcon />
      </span>
      <div className="c-login__inner">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <h3 className="ttl">Đăng Nhập</h3>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={required.email}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={required.email && "Vui Lòng Nhập Email"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="inherit" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={required.password}
              fontSize="inherit"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={required.password && "Vui Lòng Nhập Mật Khẩu"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="inherit" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng Nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Bạn quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Đăng ký ngay"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}
