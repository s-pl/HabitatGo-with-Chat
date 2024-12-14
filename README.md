
# Habitat Go | House renting

This project is a simulation of a house-renting website, similar to platforms like Airbnb and HousingAnywhere. It is built using HTML, JavaScript, and CSS.


![Logo](https://i.postimg.cc/dV1ht4XG/Habitat-Go.png)


## Technologies used

* **Frontend:** HTML, CSS, and JavaScript.
* **Libraries:**
    * Bootstrap Icons for icons.
    * Google Fonts for typography.
* **Modular Structure:** Code organized into multiple files for easy maintenance and scalability.

The **Auth** and **Database** were hosted and managed with [Firebase](firebase.google.com/)




## Database structure
A NoSQL (document-based) database was used to store user data, such as wishlists and bookings. The database structure is as follows:

```json
{
  "user123": {               
    "wishlistArray": ["house1", "house2"],  
    "houseArray": [                    
      {
        "houseId": "house3"
      },
      {
        "houseId": "house4"
      }
    ]
  }
}


```
## Installation

Install and use HabitatGo

```bash
git clone <git-url>
cd <project-name>
```

**IMPORTANT: LIVE SERVER IS CRUCIAL TO MAKE THE WHOLE PROJECT WORK. IF NOT USED, YOU BROWSER COULD BLOCK HTTP/S REQUEST THAT ARE NEEDED FOR FIREBASE**
    
## Screenshots

![App Screenshot](https://i.postimg.cc/V6TRDJCV/imagen.png)


## Authors

- [Samuel Ponce (s-pl)](https://www.github.com/s-pl)

## Acknowledgments

* **Mentorship:** Special thanks to Tiburcio for his valuable teaching.
* **Collaboration:** Thanks to my colleagues Carlos and Angelo for their constant support and feedback.

## Inspiration

The design was inspired by a Dribbble project. Although it is not an exact replica, I took references for the overall structure and design. The color palette used differs from the original design. https://dribbble.com/shots/24824987-Griyo-Real-Estate-Landing-Page

## Additional Notes

* For future developments, it is planned to integrate an online payment 
