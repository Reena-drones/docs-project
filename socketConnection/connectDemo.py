import asyncio
import json
import logging
import websockets

logging.basicConfig()

STATE = {'value': 0}
USERS = set()
USERS_MAP = dict()
ACTIVE_USER_ID = list()

def users_event(temp=None):
    if temp != None:
        print("none", users_event)
        return json.dumps({'type': 'remove_users', 'count': len(USERS), 'active':ACTIVE_USER_ID, "update_time": temp})
    return json.dumps({'type': 'users', 'count': len(USERS), 'active':ACTIVE_USER_ID})


async def notify_users(temp = None):
    if USERS:       # asyncio.wait doesn't accept an empty list
        message = users_event(temp)
        await asyncio.wait([user.send(message) for user in USERS])


async def register(websocket, path):
    id = path[1:]
    if id not in ACTIVE_USER_ID:
        USERS.add(websocket)
        ACTIVE_USER_ID.append(id)
        USERS_MAP[websocket] = id
    await notify_users()


async def unregister(websocket, path, temp=None):
    id = path[1:]
    USERS.remove(websocket)
    ACTIVE_USER_ID.remove(id)
    del USERS_MAP[websocket]
    await notify_users(temp)

async def counter(websocket, path):
    await register(websocket, path)
    try:
        async for message in websocket:
            data = json.loads(message)
            if data["id"] in ACTIVE_USER_ID:
                temp = {data["id"]: data["time"]}
                await unregister(websocket, path, temp)

    finally:
        await unregister(websocket, path)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(counter, 'localhost', 6789))
asyncio.get_event_loop().run_forever()