// ==============================================================================
// ADVANCED ANALYTICS (Supabase)
// ==============================================================================

const SUPABASE_URL = "https://anwpshueemzzujmuyotk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_BAdYLkxmiNeZ7mk_5IKZNg_NG_buq6d";
const SUPABASE_REST_URL = `${SUPABASE_URL}/rest/v1`;

// 1. Session & Identity Management
function getAnonymousId() {
  let id = localStorage.getItem('bb_anon_id');
  if (!id) {
    id = 'anon_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('bb_anon_id', id);
  }
  return id;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const anonymousId = getAnonymousId();
const sessionId = generateUUID();

// Start Session
async function initSession() {
  try {
    const sessionData = {
      id: sessionId,
      anonymous_id: anonymousId,
      language: localStorage.getItem("bb_lang") || "es",
      device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : /Tablet|iPad/i.test(navigator.userAgent) ? 'tablet' : 'desktop',
      referrer: document.referrer || null,
      landing_path: window.location.pathname
    };

    fetch(`${SUPABASE_REST_URL}/app_sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(sessionData)
    });
    
    // Log app_opened
    trackEvent('app_opened');
  } catch (error) {
    console.error("Analytics session error:", error); // Silent failure
  }
}

// 2. Tracking Functions
async function trackEvent(eventName, mode = null, metadata = null) {
  try {
    const eventData = {
      id: generateUUID(),
      anonymous_id: anonymousId,
      session_id: sessionId,
      event_name: eventName,
      mode: mode,
      metadata: metadata
    };

    fetch(`${SUPABASE_REST_URL}/game_events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(eventData)
    });
  } catch (error) {
    // Silent fail
  }
}

async function trackDuelVote(mode, tournamentId, roundNumber, songA, songB, winner, loser, position, responseTime) {
  try {
    const duelData = {
      id: generateUUID(),
      anonymous_id: anonymousId,
      session_id: sessionId,
      mode: mode,
      tournament_id: tournamentId,
      round_number: roundNumber,
      song_a_id: songA,
      song_b_id: songB,
      winner_song_id: winner,
      loser_song_id: loser,
      winner_position: position,
      response_time_ms: responseTime
    };

    fetch(`${SUPABASE_REST_URL}/duel_votes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(duelData)
    });
  } catch (error) {
    // Silent fail
  }
}

async function trackTournamentResult(mode, size, eras, winnerId, runnerUpId, topSongs, totalDuels, duration, shared = false) {
  try {
    const resultData = {
      id: generateUUID(),
      anonymous_id: anonymousId,
      session_id: sessionId,
      mode: mode,
      tournament_size: size,
      selected_eras: eras,
      winner_song_id: winnerId,
      runner_up_song_id: runnerUpId,
      top_songs: topSongs,
      total_duels: totalDuels,
      duration_ms: duration,
      shared: shared
    };

    fetch(`${SUPABASE_REST_URL}/tournament_results`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(resultData)
    });
  } catch (error) {
    // Silent fail
  }
}

async function trackTriviaAnswer(quizId, questionNum, songId, chosenId, isCorrect, responseTime, hintUsed = false) {
  try {
    const answerData = {
      id: generateUUID(),
      anonymous_id: anonymousId,
      session_id: sessionId,
      quiz_id: quizId,
      question_number: questionNum,
      song_id: songId,
      chosen_song_id: chosenId,
      correct: isCorrect,
      response_time_ms: responseTime,
      hint_used: hintUsed
    };

    fetch(`${SUPABASE_REST_URL}/trivia_answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(answerData)
    });
  } catch (error) {
    // Silent fail
  }
}

async function trackTriviaResult(quizId, totalQ, correct, score, avgTime, duration, shared = false) {
  try {
    const resultData = {
      id: generateUUID(),
      anonymous_id: anonymousId,
      session_id: sessionId,
      quiz_id: quizId,
      total_questions: totalQ,
      correct_answers: correct,
      score: score,
      avg_response_time_ms: avgTime,
      duration_ms: duration,
      shared: shared
    };

    fetch(`${SUPABASE_REST_URL}/trivia_results`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(resultData)
    });
  } catch (error) {
    // Silent fail
  }
}

// Init session on load
window.addEventListener('DOMContentLoaded', initSession);
