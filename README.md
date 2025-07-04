# Muse
Bij uitvallen/opstarten van de installatie zet je de stekker er opnieuw in, en druk op de powerknopje van de computer. Dan zou de website automatisch opstarten.

in de .sh staan alle routes, die uitgevoerd worden door de computer

klik.py zorgt ervoor dat de muis automatisch naar de knop gaat, die vervolgens verbinding maakt met de arduino

arduino_knoppen zijn voor de knoppen die zijn aangesloten op de installatie

leds_sensor.ino is voor de ledstrip, die aangaat wanneer de ultrasoundsensor getriggerd wordt als een object of persoon 50 centimeter binnen de radius van de sensor is.

De index.html speelt de animatie af, waarna er vervolgens 4 vragen worden gesteld. Nadat je op de rode of blauwe knop hebt gedrukt, wordt het antwoord opgeslagen, ongeacht de browser word afgesloten. En word ook vervolgd in de volgende sessie als de computer weer aangezet wordt. Met de showTotal wordt er weergeven hoeveel keer er op beide buttons zijn gedrukt, door de localStorage functie en worden in de ShowTotal functie opgehaald en weergeven in de totaal-container div.

De verbindMetArduino functie zorgt ervoor dat het de poort pakt met de baudrate van 19200, waardoor het gedecode wordt, zodat de lezer het pakt met de getReader functie.

De leesKnoppen leest constant de data van de arduino via de lezer.

De verwerkInput functie

De zichtBareVraag haalt alle knoppen binnen die vraag op en stuurt A als je op de eerste knop drukt (de blauwe) en B op de tweede knop (de rode).
