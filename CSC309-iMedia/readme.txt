Team name: Team Rock Band
Members: Darryl Yao (g7malice), Tong Zou (g7tonger)

Implemented features:
-Browse website
-Login/Register on website
-Retrieve password
-Search channels
-Advanced search
-view most cited and latest tags
-subscribe to a channel on daily/weekly/monthly/yearly basis
-renew subscription to channels
-view expenses, revenues, net income
-View profile
-Watch Samples (in IE;one video) of channels,productions,content and subscriptions

Incomplete features/Bugs:
-External js files do not work if referenced from the body unless it is the index (since the index serves as the 'menu' for every other page), so JS in the body is hardcoded.
-No way to get back to original page from Register,Retrieve password,subscription,license pages.
-Object tag does not work in firefox, so no active samples.
-Gridbox scrolling only works if used in a separate page, and some dynamic form functions
only work if referenced from external page (reason why there is alot of pages).
-Dynamic creditcard/paypal switching not working in profile.html when loaded from tab
-Forms do not do anything and/or has an error when submit is clicked.

Web Structure - indicates nested level of page:

index.html:

-home.html:
splash screen
--register.html: 
Login/Register
--retrieve_password.html:
Retrieve password

-channels.html:
--search.html:
Search bar
advanced search (tv,radio,tags,description,both)
--schedule.html:
Watch/listen different channels with sample video
Schedule of programs once the user clicks on a channel
---subscribe_to_channel.html:
subscribe to channel (daily/monthly/weekly/yearly)

-tags.html:
View tag search results
--tagarea.html
view Top 20, Top 50 content and channel tags
View sample videos

-my_content.html:
Uploaded content with title,tags,description,URL,size,media type
search users own videos
--contentarea.html:
streaming of own users videos
Upload, delete and edit content
---license_content.html:
License videos with 1 day,1 week,1 month,1 year
Licensed content with title,description,URL,encoding,size,price per viewer, minimum viewers per contract,viewer count

-my_subscriptions.html:
Subscribed video channels
Search for subbed channels
--subarea.html:
Expiry date 
Schedule for a channel with start time, program, description
streaming video
---renew_subscription.html:
Renew subscription to a channel

-my_productions.html:
Add,edit and delete Channel
Add new day to channel
Channel content 
my content and licensed content
--program.html:
Add,edit and delete program
Schedule of program
streaming video

-profile.html:
Login information
Personal information

-accounting.html:
Revenues and expenses for licensed content and subscriptions
Net income
Start and end date for calendar, and filters

total:20 html pages