# ChE 305: Mass Transfer I - Diffusion & Column Design

## 1. Fick's First Law of Diffusion
For molecular diffusion in binary mixture $A$ and $B$, the molar flux of $A$ relative to stationary coordinates is:

$$J_A = -D_{AB} \frac{dC_A}{dz}$$

If bulk flow is present, the total flux $N_A$ is:

$$N_A = -D_{AB} \frac{dC_A}{dz} + y_A (N_A + N_B)$$

Where:
- $y_A$ is the mole fraction of $A$
- $N_A + N_B$ represents the bulk convective flux

## 2. Diffusion of A through Stagnant B ($N_B = 0$)
Integrating Fick's law across a film of thickness $z_2 - z_1 = \delta$ yields:

$$N_A = \frac{D_{AB} P}{R T \delta p_{BM}} (p_{A1} - p_{A2})$$

Where $p_{BM}$ is the log-mean partial pressure of stagnant gas $B$:

$$p_{BM} = \frac{p_{B2} - p_{B1}}{\ln(p_{B2} / p_{B1})}$$

## 3. Equimolar Counterdiffusion (EMD, $N_A = -N_B$)

$$N_A = \frac{D_{AB}}{R T \delta} (p_{A1} - p_{A2})$$

## 4. Gas Absorption Tower Design
The height of a packed column ($Z$) can be calculated using the Transfer Unit method:

$$Z = HTU \times NTU$$

$$Z = H_{OG} \times N_{OG} = \left(\frac{G}{K_y a S}\right) \int_{y_2}^{y_1} \frac{dy}{y - y^*}$$