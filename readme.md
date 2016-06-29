# Climb Finder
##Synopsis

Climb finder provides route information and user generated feedback on routes. Utilizing the Mountain Project API: https://www.mountainproject.com/data, users will be able view a listing of routes filtered by region, climb type and climb grade.   

## User Stories
Guests can search routes by zipcode, climb type and route difficulty to be able to choose a route and view descriptions and photos of the climb. **Bonus** As a guest, you will benefit from being able to view the comments posted by users regarding the climb. 

Users have the ability log their climbs, provide comments on the climb, and add a route to their favorite routes list. As a user, you will be able to track over time where and when you've climbed, but also to add future desired climbs to your favorites list. 

## Wireframes

Home page:
![](http://i.imgur.com/L260Lhs.png)
<br>
Guest / View List Page
![](http://i.imgur.com/7BX3Y9g.png)
<br>
User's Climb Page / Favorite Climbs
![](http://i.imgur.com/QhcJCee.png)
<br>
User's Route Comment Page
![](http://i.imgur.com/i6MdgJz.png)


https://wireframe.cc/Kx5xqh
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

# Version 2 

## Synopsis
Track your climbs realtime. Users climbing a route will be able to view each grip they held and route specific data.
  


## User Walkthrough
- User logs in
- Select the route they are climbing
- Page renders a image of that route
- View details of their climb including time on wall, cruxes, and grade.
<br>
<br>
Bonus
- Illuminates the grips on the route
- As the user reaches each grip, grip changes color


### WireFrames
Login / Select climb
![](http://i.imgur.com/8xA89BU.png)

Render route
![](http://i.imgur.com/Ce8cdml.png)

Image of route
![](http://i.imgur.com/5qxkPg8.jpg)

Climber page / Stats
![](http://i.imgur.com/r38qhGx.png)

###MVP
- Login screen
- Select Route
- Render page with climb route (need to find an api that could render these rock images)
- User home submits form to enter climber's climb stats: Route Name, grade, time on wall, full ascent
- Guests can view climb details



###For a Future Project
- Using arduino: arrange led's and push buttons in a climbing patern (scaled down on a proto board)
- When a user selects a route, Led's illumniate to show the route they are taking
- To simulate the climber grabbing a hold, user will push the push button, changing the color of the led and logging it 
- This data will then render back on the users climb page 

