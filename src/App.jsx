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
    <Container maxWidth="md" sx={{py: 4}}  >
      <Typography className="heading" variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>
      <Box sx={{mx: 4}}>
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
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
        {error && (
          <div className="error-message">{error}</div>
        )}
        
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
