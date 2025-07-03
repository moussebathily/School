// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// --- USERS ---
// Inscription (simplifiée)
app.post('/register', async (req, res) => {
  const { email, password_hash, full_name, role } = req.body;
  const { data, error } = await supabase.from('users').insert([{ email, password_hash, full_name, role }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Liste utilisateurs
app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- FORUMS ---
app.get('/forums', async (req, res) => {
  const { data, error } = await supabase.from('forums').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/forums', async (req, res) => {
  const { title, description, created_by } = req.body;
  const { data, error } = await supabase.from('forums').insert([{ title, description, created_by }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- TOPICS ---
app.get('/forums/:forum_id/topics', async (req, res) => {
  const { forum_id } = req.params;
  const { data, error } = await supabase.from('topics').select('*').eq('forum_id', forum_id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/forums/:forum_id/topics', async (req, res) => {
  const { forum_id } = req.params;
  const { title, created_by } = req.body;
  const { data, error } = await supabase.from('topics').insert([{ forum_id, title, created_by }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- POSTS ---
app.get('/topics/:topic_id/posts', async (req, res) => {
  const { topic_id } = req.params;
  const { data, error } = await supabase.from('posts').select('*').eq('topic_id', topic_id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/topics/:topic_id/posts', async (req, res) => {
  const { topic_id } = req.params;
  const { content, created_by } = req.body;
  const { data, error } = await supabase.from('posts').insert([{ topic_id, content, created_by }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- GROUPS ---
app.get('/groups', async (req, res) => {
  const { data, error } = await supabase.from('groups').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/groups', async (req, res) => {
  const { name, description, is_public, created_by } = req.body;
  const { data, error } = await supabase.from('groups').insert([{ name, description, is_public, created_by }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- GROUP MEMBERS ---
app.get('/groups/:group_id/members', async (req, res) => {
  const { group_id } = req.params;
  const { data, error } = await supabase.from('group_members').select('*').eq('group_id', group_id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/groups/:group_id/members', async (req, res) => {
  const { group_id } = req.params;
  const { user_id, role } = req.body;
  const { data, error } = await supabase.from('group_members').insert([{ group_id, user_id, role }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- QUIZZES ---
app.get('/quizzes', async (req, res) => {
  const { data, error } = await supabase.from('quizzes').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/quizzes', async (req, res) => {
  const { title, description, created_by, level } = req.body;
  const { data, error } = await supabase.from('quizzes').insert([{ title, description, created_by, level }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- QUESTIONS ---
app.get('/quizzes/:quiz_id/questions', async (req, res) => {
  const { quiz_id } = req.params;
  const { data, error } = await supabase.from('questions').select('*').eq('quiz_id', quiz_id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/quizzes/:quiz_id/questions', async (req, res) => {
  const { quiz_id } = req.params;
  const { question_text, options, correct_option } = req.body;
  const { data, error } = await supabase.from('questions').insert([{ quiz_id, question_text, options, correct_option }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- QUIZ RESULTS ---
app.post('/quiz-results', async (req, res) => {
  const { quiz_id, user_id, score } = req.body;
  const { data, error } = await supabase.from('quiz_results').insert([{ quiz_id, user_id, score }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.get('/quiz-results', async (req, res) => {
  const { user_id } = req.query;
  const { data, error } = await supabase.from('quiz_results').select('*').eq('user_id', user_id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- RESOURCES ---
app.get('/resources', async (req, res) => {
  const { data, error } = await supabase.from('resources').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/resources', async (req, res) => {
  const { title, description, url, file_path, uploaded_by } = req.body;
  const { data, error } = await supabase.from('resources').insert([{ title, description, url, file_path, uploaded_by }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- CHAT MESSAGES ---
app.get('/chat/:group_id/messages', async (req, res) => {
  const { group_id } = req.params;
  const { data, error } = await supabase.from('chat_messages').select('*').eq('group_id', group_id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/chat/:group_id/messages', async (req, res) => {
  const { group_id } = req.params;
  const { sender_id, message_text } = req.body;
  const { data, error } = await supabase.from('chat_messages').insert([{ group_id, sender_id, message_text }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- VIDEOS ---
app.get('/videos', async (req, res) => {
  const { data, error } = await supabase.from('videos').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/videos', async (req, res) => {
  const { title, description, url, uploaded_by } = req.body;
  const { data, error } = await supabase.from('videos').insert([{ title, description, url, uploaded_by }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// --- NOTIFICATIONS ---
app.get('/notifications', async (req, res) => {
  const { user_id } = req.query;
  const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user_id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/notifications', async (req, res) => {
  const { user_id, message } = req.body;
  const { data, error } = await supabase.from('notifications').insert([{ user_id, message }]);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
