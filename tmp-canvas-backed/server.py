from eve import Eve
from flask import current_app, request
from users import blueprint

def set_username_as_none(username):
    if request.endpoint is None:
      return None
    resource = request.endpoint.split('|')[0]
    return  current_app.data.driver.db[resource].update(  # type: ignore
        {"user" : username},
        {"$set": {"user": None}},
        multi=True
    )

app = Eve()
# register the blueprint to the main Eve application
app.register_blueprint(blueprint)

# bind the callback function so it is invoked at each user deletion
app.users_deleted += set_username_as_none  # type: ignore

if __name__ == '__main__':
  app.run()
