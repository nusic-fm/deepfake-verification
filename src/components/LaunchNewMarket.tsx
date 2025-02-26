import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  InputAdornment,
  Switch,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface LaunchNewMarketProps {
  onSubmit: (marketData: any) => void;
}

const LaunchNewMarket: React.FC<LaunchNewMarketProps> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [marketData, setMarketData] = useState({
    name: "",
    realAudio: null as File | null,
    deepfakeAudio: null as File | null,
    image: null as File | null,
    enableCountdown: false,
    minimumBet: 0.1,
    duration: 24, // hours
  });
  const [deepfakeTab, setDeepfakeTab] = useState(0);
  const [ttsText, setTtsText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    onSubmit(marketData);
    handleClose();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "realAudio" | "deepfakeAudio" | "image"
  ) => {
    const file = event.target.files?.[0] || null;
    setMarketData((prev) => ({ ...prev, [field]: file }));
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    field: "realAudio" | "deepfakeAudio"
  ) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      setMarketData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleGenerateTTS = () => {
    // TODO: Implement TTS generation
    console.log("Generating TTS from:", ttsText);
  };

  const onLaunchMarket = async () => {
    // const marketId = await createMarket(marketData);
    // await uploadMarketImage(marketData.image, marketId);
    // await uploadMarketRealAudio(marketData.realAudio, marketId);
    // await uploadMarketDeepfakeAudio(marketData.deepfakeAudio, marketId);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ height: 40 }}
      >
        Launch New Market
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, px: 3, pt: 2 }}
        >
          <Typography variant="h5">Launch New Verification Market</Typography>
          <Tooltip
            title="Fee of 0.02 SOL will be charged for the market creation"
            placement="bottom"
          >
            <InfoOutlinedIcon sx={{ fontSize: 18 }} />
          </Tooltip>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 15, right: 12 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Market Name"
              fullWidth
              value={marketData.name}
              onChange={(e) =>
                setMarketData((prev) => ({ ...prev, name: e.target.value }))
              }
              size="small"
            />

            {/* Real Audio Drop Area */}
            <Paper
              onDrop={(e) => handleDrop(e, "realAudio")}
              onDragOver={handleDragOver}
              sx={{
                p: 2,
                border: "2px dashed #ccc",
                textAlign: "center",
                cursor: "pointer",
                bgcolor: "background.paper",
              }}
            >
              <input
                accept="audio/*"
                style={{ display: "none" }}
                id="real-audio-file"
                type="file"
                onChange={(e) => handleFileChange(e, "realAudio")}
              />
              <label htmlFor="real-audio-file">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 40 }} />
                  <div>Drag and drop Real Audio here or</div>
                  <Button variant="contained" component="span" size="small">
                    Choose File
                  </Button>
                  {marketData.realAudio && (
                    <div>Selected: {marketData.realAudio.name}</div>
                  )}
                </Box>
              </label>
            </Paper>

            {/* Deepfake Audio Section */}
            <Paper sx={{ mt: 2 }}>
              <Tabs
                value={deepfakeTab}
                onChange={(_, newValue) => setDeepfakeTab(newValue)}
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tab label="Upload Audio" />
                <Tab label="Generate TTS" />
              </Tabs>

              <Box sx={{ p: 2 }}>
                {deepfakeTab === 0 ? (
                  <Box
                    onDrop={(e) => handleDrop(e, "deepfakeAudio")}
                    onDragOver={handleDragOver}
                    sx={{
                      p: 2,
                      border: "2px dashed #ccc",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      accept="audio/*"
                      style={{ display: "none" }}
                      id="deepfake-audio-file"
                      type="file"
                      onChange={(e) => handleFileChange(e, "deepfakeAudio")}
                    />
                    <label htmlFor="deepfake-audio-file">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <CloudUploadIcon sx={{ fontSize: 40 }} />
                        <div>Drag and drop Deepfake Audio here or</div>
                        <Button
                          variant="contained"
                          component="span"
                          size="small"
                        >
                          Choose File
                        </Button>
                        {marketData.deepfakeAudio && (
                          <div>Selected: {marketData.deepfakeAudio.name}</div>
                        )}
                      </Box>
                    </label>
                  </Box>
                ) : (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      multiline
                      rows={3}
                      label="Text to Convert"
                      value={ttsText}
                      onChange={(e) => setTtsText(e.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      onClick={handleGenerateTTS}
                      disabled={!ttsText.trim()}
                      size="small"
                    >
                      Generate Audio
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>

            <Box>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-file"
                type="file"
                onChange={(e) => handleFileChange(e, "image")}
              />
              <label htmlFor="image-file">
                <Button variant="outlined" component="span" fullWidth>
                  {marketData.image
                    ? marketData.image.name
                    : "Upload Image or Video (Optional)"}
                </Button>
              </label>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={marketData.enableCountdown}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMarketData((prev) => ({
                      ...prev,
                      enableCountdown: e.target.checked,
                    }))
                  }
                />
              }
              label="Enable Countdown"
            />

            <TextField
              label="Minimum Bet (SOL)"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">◎</InputAdornment>
                ),
              }}
              inputProps={{
                step: 0.1,
              }}
              value={marketData.minimumBet}
              onChange={(e) =>
                setMarketData((prev) => ({
                  ...prev,
                  minimumBet: parseFloat(e.target.value),
                }))
              }
              size="small"
            />

            <TextField
              label="Market Duration (hours)"
              type="number"
              value={marketData.duration}
              onChange={(e) =>
                setMarketData((prev) => ({
                  ...prev,
                  duration: parseInt(e.target.value),
                }))
              }
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Launch Market
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LaunchNewMarket;
