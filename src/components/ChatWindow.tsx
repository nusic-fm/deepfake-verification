import { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  bet?: {
    amount: number;
    prediction: "real" | "fake";
  };
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    user: "Alice",
    message: "This one sounds too perfect to be real!",
    timestamp: new Date(),
    bet: { amount: 0.5, prediction: "fake" },
  },
  {
    id: "2",
    user: "Bob",
    message: "The voice modulation seems natural, betting on real",
    timestamp: new Date(),
    bet: { amount: 1.2, prediction: "real" },
  },
  // Add more mock messages here
];

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "You",
      message: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <Paper
      sx={{
        height: "calc(100vh - 100px)",
        background: "rgba(20, 20, 30, 0.8)",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        Live Chat & Bets
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              p: 1,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {msg.user}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {msg.message}
            </Typography>
            {msg.bet && (
              <Typography
                variant="caption"
                sx={{
                  color:
                    msg.bet.prediction === "real"
                      ? "success.main"
                      : "error.main",
                  display: "block",
                  mt: 0.5,
                }}
              >
                🎲 Bet {msg.bet.amount} SOL on {msg.bet.prediction}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default ChatWindow;
