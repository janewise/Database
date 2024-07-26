
import React, { useRef, useEffect, useReducer, useState } from "react";
//for ts
import UpgradeState from "../classes/upgradeState";
import UpgradeEnergy from "../classes/upgradeEnergy";
//
import UpgradeButton from "../components/upgradeButton";
import { ShareBal } from "../components/ShareBalance/sharebalance";
import { SaveGame } from "../components/saveGame";

export function Freemine() {
  const balanceRef = useRef({ value: 0 });
  const forceUpdate = useReducer(x => x + 1, 0)[1];

  const [energy, setEnergy] = useState(100);
  const [maxEnergy, setMaxEnergy] = useState(100);
  const [refillRate, setRefillRate] = useState(1);


  const upgradeMap = useRef(new Map<string, UpgradeState>([
    ['clickUpgrade', new UpgradeState(15, 1.1, 1, 1)],
    ['autoClicker01', new UpgradeState(80, 1.15, 0, 0.1)],
    ['autoClicker02', new UpgradeState(200, 1.15, 0, 3)],
    ['autoClicker03', new UpgradeState(1100, 1.15, 0, 8)],
    ['autoClicker04', new UpgradeState(12000, 1.15, 0, 45)],
    ['autoClicker05', new UpgradeState(130000, 1.15, 0, 250)],
    ['autoClicker06', new UpgradeState(1400000, 1.15, 0, 1380)],
    ['autoClicker07', new UpgradeState(15, 1.15, 0 , 7600)],
    ['refClicker01', new UpgradeState(15, 1.15, 0 , 1)],
    ['refClicker02', new UpgradeState(35, 1.15, 0 , 2)],
  ]));

  const upgradeEnergyMap = useRef(new Map<string, UpgradeEnergy>([
    ['energyPool', new UpgradeEnergy(40, 1.4, 50,0)],
    ['energyfill', new UpgradeEnergy(70, 2,0, 1)],
  ]));

  let autoIncrement: number = Math.round(
    ( upgradeMap.current.get('autoClicker01')!.increment +
      upgradeMap.current.get('autoClicker02')!.increment +
      upgradeMap.current.get('autoClicker03')!.increment +
      upgradeMap.current.get('autoClicker04')!.increment +
      upgradeMap.current.get('autoClicker05')!.increment +
      upgradeMap.current.get('autoClicker06')!.increment +
      upgradeMap.current.get('autoClicker07')!.increment +
      upgradeMap.current.get('refClicker01')!.increment +
      upgradeMap.current.get('refClicker02')!.increment
    ) * 100) / 100;



  useEffect(() => {
    const interval = setInterval(() => {
      balanceRef.current.value = Math.round((balanceRef.current.value + (autoIncrement / 10)) * 100) / 100;
      forceUpdate();
    }, 100);

    return () => clearInterval(interval);
  });

  const upgradeInvocationHandler = (
    id: string,
    upgradeMap: React.MutableRefObject<Map<string, UpgradeState>>,
    upgradeEnergyMap: React.MutableRefObject<Map<string, UpgradeEnergy>>,
    balanceRef: React.MutableRefObject<{ value: number }>,
    setMaxEnergy: React.Dispatch<React.SetStateAction<number>>,
    setRefillRate: React.Dispatch<React.SetStateAction<number>>,
  ): void => {
    if (upgradeMap.current.has(id)) {
      const cost = upgradeMap.current.get(id)!.currentCost;
      if (upgradeMap.current.get(id)!.upgrade(balanceRef.current.value)) {
        console.log(`Upgraded ${id} component.`);
        balanceRef.current.value = Math.round((balanceRef.current.value - cost) * 100) / 100;
      } else {
        console.log(`Balance is too low to upgrade ${id} component.`);
      }
    }
  }

  return (
    <>
              <SaveGame
                balanceRef={balanceRef}
                upgradeMap={upgradeMap}
               upgradeEnergyMap={upgradeEnergyMap}
              />
              <ShareBal
            balanceRef={balanceRef}
            clickIncrement={upgradeMap.current.get("clickUpgrade")!.increment}
            autoIncrement={autoIncrement}
            refillRate={refillRate}
          />

              <div className="row center">
                <div className=" col-6 col-sm-6 col-md-6 col-lg-6">
                  <UpgradeButton
                    id="autoClicker01"
                    name="Intern"
                    level={upgradeMap.current.get('autoClicker01')!.level}
                    cost={upgradeMap.current.get('autoClicker01')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker01')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                  <UpgradeButton
                    id="autoClicker03"
                    name="Senior developer"
                    level={upgradeMap.current.get('autoClicker03')!.level}
                    cost={upgradeMap.current.get('autoClicker03')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker03')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                  <UpgradeButton
                    id="autoClicker05"
                    name="Chief Manager"
                    level={upgradeMap.current.get('autoClicker05')!.level}
                    cost={upgradeMap.current.get('autoClicker05')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker05')!.incrementAdd}

                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                  <UpgradeButton
                    id="autoClicker07"
                    name="C.E.O"
                    level={upgradeMap.current.get('autoClicker07')!.level}
                    cost={upgradeMap.current.get('autoClicker07')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker07')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                </div>
                <div className=" col-6 col-sm-6 col-md-6 col-lg-6">
                  <UpgradeButton
                    id="autoClicker02"
                    name="Junior developer"
                    level={upgradeMap.current.get('autoClicker02')!.level}
                    cost={upgradeMap.current.get('autoClicker02')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker02')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                  <UpgradeButton
                    id="autoClicker04"
                    name="Manager"
                    level={upgradeMap.current.get('autoClicker04')!.level}
                    cost={upgradeMap.current.get('autoClicker04')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker04')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                  <UpgradeButton
                    id="autoClicker06"
                    name="Director"
                    level={upgradeMap.current.get('autoClicker06')!.level}
                    cost={upgradeMap.current.get('autoClicker06')!.currentCost}
                    increment={upgradeMap.current.get('autoClicker06')!.incrementAdd}
                    balance={balanceRef.current.value}
                    autoIncrementTotal={autoIncrement}
                    clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, upgradeEnergyMap, balanceRef, setMaxEnergy, setRefillRate); }}
                  />
                </div>
              </div>

          {/*down are overlay and container  */}
    </>
  )
}