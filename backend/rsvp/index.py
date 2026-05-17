import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Сохранение RSVP-ответа гостя свадьбы Александра и Виктории."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body = json.loads(event.get('body') or '{}')

    first_name = body.get('first_name', '').strip()
    last_name = body.get('last_name', '').strip()
    attending = body.get('attending')
    guests_count = int(body.get('guests_count', 1))
    drinks = body.get('drinks', [])
    song_request = body.get('song_request', '').strip() or None
    plus_one_first_name = body.get('plus_one_first_name', '').strip() or None
    plus_one_last_name = body.get('plus_one_last_name', '').strip() or None
    plus_one_drinks = body.get('plus_one_drinks', [])

    if not first_name or not last_name or attending is None:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'first_name, last_name and attending are required'})
        }

    # Convert Python lists to PostgreSQL array literals
    def to_pg_array(lst):
        if not lst:
            return '{}'
        escaped = [str(v).replace('"', '\\"') for v in lst]
        return '{' + ','.join(f'"{e}"' for e in escaped) + '}'

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    schema = 't_p563939_wedding_invitation_s'
    sql = f"""
        INSERT INTO {schema}.rsvp
            (first_name, last_name, attending, guests_count, drinks, song_request,
             plus_one_first_name, plus_one_last_name, plus_one_drinks)
        VALUES ('{first_name}', '{last_name}', {bool(attending)}, {guests_count},
                '{to_pg_array(drinks)}', {'NULL' if song_request is None else "'" + song_request.replace("'", "''") + "'"},
                {'NULL' if plus_one_first_name is None else "'" + plus_one_first_name.replace("'", "''") + "'"},
                {'NULL' if plus_one_last_name is None else "'" + plus_one_last_name.replace("'", "''") + "'"},
                '{to_pg_array(plus_one_drinks)}')
        RETURNING id, created_at
    """
    cur.execute(sql)
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'id': row[0],
            'created_at': row[1].isoformat()
        })
    }