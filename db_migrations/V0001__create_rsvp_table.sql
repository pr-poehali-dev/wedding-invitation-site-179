CREATE TABLE t_p563939_wedding_invitation_s.rsvp (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Основной гость
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  attending BOOLEAN NOT NULL,
  guests_count SMALLINT NOT NULL DEFAULT 1,  -- 1 = только я, 2 = я и +1
  drinks TEXT[] DEFAULT '{}',                 -- массив напитков
  song_request VARCHAR(500),

  -- Гость +1 (если guests_count = 2)
  plus_one_first_name VARCHAR(100),
  plus_one_last_name VARCHAR(100),
  plus_one_drinks TEXT[] DEFAULT '{}'
);

COMMENT ON TABLE t_p563939_wedding_invitation_s.rsvp IS 'RSVP ответы гостей на свадьбу Александра и Виктории';
