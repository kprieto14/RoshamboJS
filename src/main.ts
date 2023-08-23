import './style.css'

const sections = document.querySelectorAll('section')
const turnBanner = document.querySelector('h2')

let playerOne = ''
let playerTwo = ''

function chooseWeapon(event: MouseEvent) {
    const iconClickedOn = event.target;

    //When user clicks on image or li with weapon then it will try to see if you are an active player
    if(iconClickedOn instanceof HTMLLIElement || iconClickedOn instanceof Image) {
        //Looks at the div's and section to find out current active player
        const weapon = iconClickedOn.closest('div')
        const currentPlayer = iconClickedOn.closest('section')
    
        //Checks if the icon clicked is the first player
        if(currentPlayer?.classList.contains('active-player') && currentPlayer?.classList.contains('player1')) {
            //Looks and assigns weapon to player1
            if(weapon?.classList.contains('rock')) {
                playerOne = "rock"
            }
            else if(weapon?.classList.contains('paper')) {
                playerOne = "paper"
            }
            else if(weapon?.classList.contains('scissors')) {
                playerOne = "scissors"
            }

            //Take activeplayer class from player1 and give to player2
            currentPlayer.classList.remove('active-player')
            sections[1].classList.add('active-player')
            
            //Change Span to indicate it is Player 2's turn
            if(turnBanner instanceof HTMLHeadingElement) {
                turnBanner.innerHTML = "It is <span>Player 2's</span> turn, choose your weapon wisely"
            }
        }
        //Checks if 2nd player is active
        else if(currentPlayer?.classList.contains('active-player') && currentPlayer?.classList.contains('player2')) {
            //Looks and assigns weapon to player2
            if(weapon?.classList.contains('rock')) {
                playerTwo = "rock"
            }
            else if(weapon?.classList.contains('paper')) {
                playerTwo = "paper"
            }
            else if(weapon?.classList.contains('scissors')) {
                playerTwo = "scissors"
            }

            //Removes activeplayer from player2 and then checks the results
            currentPlayer.classList.remove('active-player')
            checkResults()
            //Makes button visibile to play again
            document.querySelector('button')?.classList.remove('hidden')
        }
    }
}

//Compares first player to 2nd player's choices
function checkResults() {
    switch(playerOne) {
        case "rock":
            switch(playerTwo) {
                case "rock":
                    victoryScreech("draw") 
                    break

                case "paper":
                    victoryScreech("lose") 
                    break

                case "scissors":
                    victoryScreech("win") 
                    break
            }
            break

        case "paper":
            switch(playerTwo) {
                case "rock":
                    victoryScreech("win") 
                    break

                case "paper":
                    victoryScreech("draw") 
                    break

                case "scissors":
                    victoryScreech("lose") 
                    break
            } 
            break

        case "scissors":
            switch(playerTwo) {
                case "rock":
                    victoryScreech("lose") 
                    break

                case "paper":
                    victoryScreech("win") 
                    break

                case "scissors":
                    victoryScreech("draw") 
                    break
            }
            break
    }
}
//Changes the banner appropriately
function victoryScreech(status:string) {
    switch(status) {
        case "draw":
            if(turnBanner instanceof HTMLHeadingElement) {
                turnBanner.innerHTML = '<span>Draw</span> ⚔️ Good job both of you!'
            }
            break;

        case "win":
            if(turnBanner instanceof HTMLHeadingElement) {
                turnBanner.innerHTML = 'Congratulations <span>Player 1</span>! 😻'
            }
            sections[0].classList.add('winner')
            break;

        case "lose":
            if(turnBanner instanceof HTMLHeadingElement) {
                turnBanner.innerHTML = 'Congratulations <span>Player 2</span>! 😻'
            }
            sections[1].classList.add('winner')
            break;
    }
}
//When button is clicked, will reset everything
function restartGame(event: MouseEvent) {
    const itemClickedOn = event.target

    if(itemClickedOn instanceof HTMLButtonElement) {
        //Makes player 1 active-player again and removes winner off both sections
        sections[0].classList.add('active-player')
        sections[0].classList.remove('winner')
        sections[1].classList.remove('winner')
        //Changes turn banner back to original state
        if(turnBanner instanceof HTMLHeadingElement) {
            turnBanner.innerHTML = "It is <span>Player 1's</span> turn, choose your weapon wisely"
        }

        document.querySelector('button')?.classList.add('hidden')
        console.log(turnBanner)
    }
}

//Stores users choices when it clicks on the section
sections.forEach((icon) => icon.addEventListener('click', chooseWeapon))
//When button is clicked, will reset everything
document.querySelector('button')?.addEventListener('click', restartGame)