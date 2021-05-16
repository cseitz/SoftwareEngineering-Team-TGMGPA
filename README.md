# Software Engineering Project

## Information

As part of Kent State University's CS 33901, our group developed a piece of software throughout the semester using the [Scrum Process](https://www.scrum.org/resources/what-is-scrum).

Our Team's Sprints can be found on our [Project Board](https://github.com/cseitz/SoftwareEngineering-Team-TGMGPA/projects?query=is%3Aclosed).

While this project was deployed for a final presentation, this project is no longer being hosted due to the cost of hosting resources.

## Team Roles

### President
- [Nolan Spencer](https://github.com/NolSpencer)

The President was the owner of the project. Their role consisted of being the main line of communication between Dr. Delozier and our team, ensured we all submitted out assignments on time, and assisted the Marketing team in documentation and research. 

Additionally, due to the fairly non-time-consuming nature of this role in our situation, Nolan Spencer also worked part-time as a Software Developer when he did not have any immediate Presidential duties.

### Scrum Master
- [Chris Seitz](https://github.com/cseitz)

The Scrum Master was the main individual that facilitated team meetings, sprint planning, oversight of source code, reviewed code, merged code, and more.

In addition to these duties, due to Chris Seitz's previous experience in this area, he frequently worked part-time as a Software Developer and assisted the team on completing the team's more difficult development tasks.

### Marketing / Research / Documentation
- [Noah Baker](https://github.com/nbaker24)
- [Song Li](https://github.com/sli55)

The Marketing Team was responsible for any and all non-development and non-planning tasks associated with our project. They frequently documented all our meetings, assisted the President and Scrum Master with insight on what features could be useful to the product, and sought out feedback from actual users throughout the development process.

### Software Developer
- [Alvacir Wesley](https://github.com/wesaka), *Senior Developer*
- [Justin Clark](https://github.com/justintclark)
- [Cieara Pfiefer](https://github.com/cpfeifer)
- [Josh Keegan](https://github.com/jkeegan1)
- [Ronnie Silvey](https://github.com/rsilvey1)

The Development Team was responsible for any and all programming tasks related to the project, with the exception of Project Deployment. Their work is clearly visible throughout this repository.

Alvacir Wesley was a major contributor in this area, and was positioned as the team's Senior Developer.

### Test Engineer
- [Joel Lee](https://github.com/Chulz25), *Senior Test Engineer*
- [Jeremy Reese](https://github.com/JReese1212)

Test Engineers were responsible for writing code to inspect the performance and capabilities of our application. Their work is clearly visible within the [Test Directory](https://github.com/cseitz/SoftwareEngineering-Team-TGMGPA/tree/main/test).

Joel Lee was a major contributor in this area, and was positioned as the team's Senior Test Engineer, with Jeremy Reese in training under him.

### Operations Engineer
- [Damani Wade](https://github.com/damaniwade)

The Operations Engineer was responsible for the final deployment of our application to remotely hosted servers, with the addition of automating the deployment process to occur automatically when new changes were committed.

Damani Wade set up automated deployment to a remote server via Github Actions.

Due to how the Operations Engineer position had no duties up until the final few weeks of the project, Damani frequently worked as a Software Developer up until the end of the semester when his Operations Engineer role would take precedence.





# Usage

## swift
Education SWIFT web app

Original Author: Gregory S. DeLozier, Ph.D.
Version 0.1 Date: Jan 19, 2021

Since undergone extensive modification by our Team, as per the instructions of Dr. Delozier.

# Installing
```bash
# Install Packages
pip3 install libsass dataset bottle bcrypt
# Run Setup
python3 setup.py
```

# Running Application

```bash
# Listens on port 8080 by default
python3 swift.py
```
```bash
# Specify a port via Environment Variables
PORT=80 python3 swift.py
```
