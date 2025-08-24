import {useState} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./App.css";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://email-ai-backend-production.up.railway.app/api/email/generate",
        {
          emailContent,
          tone,
        }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{py: 4}}>
      <Typography className="heading" variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box
        sx={{mx: 4}}
        style={{alignItems: "center", display: "flex", flexDirection: "column"}}
      >
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Your Email"
          value={emailContent || ""}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb: 2}}
        />
        <FormControl fullWidth sx={{mb: 2}}>
          <InputLabel>Tone</InputLabel>
          <Select
            value={tone || ""}
            label={"Tone"}
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value={"formal"}>Formal</MenuItem>
            <MenuItem value={"informal"}>Informal</MenuItem>
            <MenuItem value={"friendly"}>Friendly</MenuItem>
            <MenuItem value={"professional"}>Professional</MenuItem>
            <MenuItem value={"casual"}>Casual</MenuItem>
          </Select>
        </FormControl>
        <button
          className="cssbuttons-io-button"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          style={{
            width: "50%",
            padding: "12px",
            justifyContent: "center",
            textAlign: "center",
            gap: "8px",
            fontSize: "1.1rem",
            background: "#de87f6ff",
            color: "#000000ff",
            border: "none",
            borderRadius: "20px",
            cursor: !emailContent || loading ? "not-allowed" : "pointer",
            opacity: !emailContent || loading ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {loading ? (
            <CircularProgress
              size={24}
              style={{color: "#fff", marginRight: "8px"}}
            />
          ) : null}
          Get started
          <div className="icon" style={{marginLeft: "8px"}}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>

        

        {error && <div className="error-message">{error}</div>}
      </Box>
      {generatedReply && (
        <Box sx={{mt: 3}}>
          <Typography variant="h6" gutterBottom>
            Generated Reply
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            value={generatedReply || ""}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="outlined"
            sx={{mt: 2}}
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
