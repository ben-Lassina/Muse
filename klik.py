import pyautogui
import time

# Wacht een paar seconden zodat je het juiste venster kunt activeren
time.sleep(10)

# === Locatie van de knop (X, Y) in pixels ===
x = 200
y = 70

# Beweeg de muis en klik
pyautogui.moveTo(100, 100)
pyautogui.click()
time.sleep(2)
pyautogui.press('f11')
time.sleep(0.5)
pyautogui.moveTo(x, y)
pyautogui.click()
time.sleep(0.5)
pyautogui.click()
time.sleep(0.5)
pyautogui.press('enter')
time.sleep(0.5)
pyautogui.moveTo(1895,70)
time.sleep(2)
pyautogui.click()
time.sleep(0.5)
pyautogui.click()
time.sleep(0.5)
pyautogui.click()


print(f"Klik uitgevoerd op positie ({x}, {y})")
