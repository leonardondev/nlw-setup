import { ScrollView, Text, View } from "react-native";

import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

export function Home() {
  const summaryDates = generateDatesFromYearBeginning();

  const minimumSummaryDatesSize = 16 * 7;
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

  return (
    <View className="flex-1 bg-background px-7 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {summaryDates.map((date, i) => (
            <HabitDay key={date.toString()} />
          ))}
          {amountOfDaysToFill > 0 &&
            Array(amountOfDaysToFill)
              .fill(null)
              .map((_, i) => (
                <View
                  key={i}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
        </View>
      </ScrollView>
    </View>
  );
}
