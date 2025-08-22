<template>
  <div class="calendar_wrapper">
    <div class="calendar_nav">
      <div class="calendar_nav_back"></div>
      <div class="calendar_nav_date" @click="showpicker = true">
        {{ dateStr.startsWith('农历') ? '农历 ' + nowyear + '年' + dateinfo.yinli : '公历 ' + nowyear + '年' + nowmonth + '月' + selectDate.getDay() + '日' }} {{ selectDate.getHour() }}:{{ String(selectDate.getMinute()).padStart(2, '0') }}<Icon name="arrow-down" />
      </div>
      <div class="calendar_nav_jin">
        <img 
          :src="isDateFavorited ? 'src/assets/icon/首页/已收藏.png' : 'src/assets/icon/首页/未收藏.png'" 
          @click="saveFavoriteDate" 
          class="favorite-icon"
          alt="收藏图标"
        />
      </div>
    </div>
    <div class="calendar">
      <div class="calendar_body">
        <div class="calendar_body_week">
          <div class="cbw_item" v-for="item in weeklist" :key="item.value">
            {{ item.label }}
          </div>
        </div>
        <div class="calendar_body_date">
          <div
            class="cbd_item"
            @click="selectDay(item)"
            :class="{
              notnowmonth: nowmonth != item.getMonth(),
              nowdate:
                nowdate == item.getDay() &&
                gdmonth == item.getMonth() &&
                gdyear == item.getYear(),
              selectday:
                selectDate.getDay() == item.getDay() &&
                selectDate.getMonth() == item.getMonth(),
              nowork: isWork(item) === false,
              ban: isWork(item) === true,
            }"
            v-for="item in datelist"
            :key="item"
          >
            <div class="cbd_item_yangli">{{ item.getDay() }}</div>
            <div class="cbd_item_jq" v-if="item?.getLunar()?.getJieQi()">
              {{ item.getLunar().getJieQi() }}
            </div>
            <div
              v-else-if="item.getLunar().getFestivals()[0]"
              class="cbd_item_fest"
            >
              {{ item.getLunar().getFestivals()[0] }}
            </div>

            <div v-else-if="item.getFestivals()[0]" class="cbd_item_fest">
              {{ item.getFestivals()[0] }}
            </div>
            <!-- <div v-else-if="item.getOtherFestivals()[0]" class="cbd_item_fest">
              {{ item.getOtherFestivals()[0] }}
            </div> -->
            <div class="cbd_item_yinli" v-else>
              {{ item.getLunar().getDayInChinese() }}
            </div>
          </div>
        </div>
      </div>

      <Overlay
        class="calendar_picker"
        :show="showpicker"
      >
        <div class="wrapper">
          <PickerDate ref="dateRef" v-model="dateStr" v-model:show="showpicker" @confirm="confirm" @close="showpicker = false" :selectDate="selectDate"/>
        </div>
      </Overlay>
    </div>

    <!-- <div class="showinfo">
      <div class="showinfo_yili">
        <Icon
          class="showinfo_yili_icon"
          @click="nextDay(-1)"
          name="arrow-left"
        />

        <div class="showinfo_yili_mid">
          <div class="showinfo_yili_til">{{ dateinfo.yinli }}</div>
          <div class="showinfo_yili_info">
            <span>{{ dateinfo.ganzhiyear }}</span
            ><span>{{ dateinfo.ganzhimonth }}月</span
            ><span>{{ dateinfo.ganzhiday }}日</span
            ><span>星期{{ dateinfo.xingqi }}</span>
          </div>
        </div>
        <Icon class="showinfo_yili_icon" @click="nextDay(1)" name="arrow" />
      </div>
    </div> -->

    <div class="card_wrap">
      <!-- 第一张卡 -->
      <section class="card card-1">
        <div class="small-title">本日的五行日主是：</div>
        <img :src="wuxingFirstCharMap[dateinfo.tiangan]?.imageUrl" alt="五行图标" style="width: 50%; height: auto; aspect-ratio: 1/1;" />
        <h3 class="elem-name" :style="{ color: wuxingFirstCharMap[dateinfo.tiangan]?.color }">{{ wuxingFirstCharMap[dateinfo.tiangan]?.name }}</h3>
        <p class="elem-desc" :style="{ color: wuxingFirstCharMap[dateinfo.tiangan]?.color }">{{ wuxingFirstCharMap[dateinfo.tiangan]?.description }}</p>
      </section>

      <!-- 第二张卡 -->
      <section class="card card-2">
        <div class="line">{{ dateinfo.ganzhiyear.substring(0, 2) }}年 {{ dateinfo.ganzhimonth }}月 {{ dateinfo.ganzhiday }}日 【{{ dateinfo.ganzhiyear.charAt(1) }}{{ dateinfo.ganzhiyear.charAt(dateinfo.ganzhiyear.length - 2) }}】 {{ dateinfo.yinli }}</div>

        <div class="two-col">
          <!-- 左组件：四个并排的子组件（每个：上灰字/下彩字） -->
          <div class="left-four">
            <div>
              <div class="meta">年</div>
              <div class="value">
                <span :style="{ color: wuxingFirstCharMap[dateinfo.ganzhiyear.charAt(0)]?.color }">{{ dateinfo.ganzhiyear.charAt(0) }}</span>
                <br><br>
                <span :style="{ color: wuxingFirstCharMap[dateinfo.ganzhiyear.charAt(1)]?.color }">{{ dateinfo.ganzhiyear.charAt(1) }}</span>
              </div>
            </div>
            <div>
              <div class="meta">月</div>
              <div class="value">
                <span :style="{ color: wuxingFirstCharMap[dateinfo.ganzhimonth.charAt(0)]?.color }">{{ dateinfo.ganzhimonth.charAt(0) }}</span>
                <br><br>
                <span :style="{ color: wuxingFirstCharMap[dateinfo.ganzhimonth.charAt(1)]?.color }">{{ dateinfo.ganzhimonth.charAt(1) }}</span>
              </div>
            </div>
            <div>
              <div class="meta">日</div>
              <div class="value">
                <span :style="{ color: wuxingFirstCharMap[dateinfo.ganzhiday.charAt(0)]?.color }">{{ dateinfo.ganzhiday.charAt(0) }}</span>
                <br><br>
                <span :style="{ color: wuxingFirstCharMap[dateinfo.ganzhiday.charAt(1)]?.color }">{{ dateinfo.ganzhiday.charAt(1) }}</span>
              </div>
            </div>
            <div>
              <div class="meta">时</div>
              <div class="value">
                <span :style="{ color: wuxingFirstCharMap[dateinfo.ganzhihour.charAt(0)]?.color }">{{ dateinfo.ganzhihour.charAt(0) }}</span>
                <br><br>
                <span :style="{ color: wuxingFirstCharMap[dateinfo.ganzhihour.charAt(1)]?.color }">{{ dateinfo.ganzhihour.charAt(1) }}</span>
              </div>
            </div>
          </div>

          <!-- 右组件：竖向四行；每行左右并排，左橘底，右黑字 -->
          <div class="right-list">
            <div class="right-item">
              <span class="badge">日柱</span>
              <span class="item-text">{{ dateinfo.ganzhiday }}</span>
            </div>
            <div class="right-item">
              <span class="badge">月份</span>
              <span class="item-text">{{ dateinfo.ganzhimonth }}</span>
            </div>
            <div class="right-item">
              <span class="badge">星座</span>
              <span class="item-text">{{ getConstellationByDate(selectDate.getMonth() + 1, selectDate.getDay())?.name }}</span>
            </div>
            <div class="right-item">
              <span class="badge">调候<br>建议</span>
              <span class="item-text">{{ tiaohouMap[dateinfo.ganzhiday.charAt(0) + dateinfo.ganzhimonth.charAt(1)]?.value }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- <div class="showinfo">
      <div class="showinfo_yiji">
        <div class="showinfo_yiji_cont">
          <div class="syc_yi">
            <div class="syc_icon">
              <div class="syc_icon_inner">宜</div>
            </div>
            <div class="syc_icon_item">
              <span v-for="item in dateinfo.dayyi" :key="item">{{ item }}</span>
            </div>
          </div>
          <div class="syc_yi syc_ji">
            <div class="syc_icon syc_ji">
              <div class="syc_icon_inner j_inner">忌</div>
            </div>
            <div class="syc_icon_item">
              <span v-for="item in dateinfo.dayji" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="showinfo_yiji_wrapper">
          <div class="syw_inner" @click="toselect">吉日查询</div>
        </div>
      </div>
    </div>
    <div class="showinfo">
      <div class="showinfo_wxcs">
        <div class="showinfo_wxcs_wcz">
          <div class="sww_item">
            <div class="sww_item_til">五行</div>
            <div class="sww_item_value">{{ dateinfo.wuxing }}</div>
          </div>
          <div class="sww_item">
            <div class="sww_item_til">冲煞</div>
            <div class="sww_item_value">{{ dateinfo.chongsha }}</div>
          </div>
          <div class="sww_item noboder">
            <div class="sww_item_til">值神</div>
            <div class="sww_item_value">{{ dateinfo.zhishen }}</div>
          </div>
        </div>
        <div class="showinfo_wxcs_sycj">
          <div class="sws_label">时宜辰忌</div>
          <div class="sws_value">
            <div
              class="sws_value_list"
              :class="{ nowtime: nowtime == item.getGanZhi() }"
              v-for="(item, index) in dateinfo.times"
              :key="index"
            >
              {{ item.getGanZhi()
              }}{{
                Lunar.fromDate(
                  new Date(nowyear, nowmonth, nowdate, index * 2, 0, 0)
                ).getTimeTianShenLuck()
              }}
            </div>
          </div>
        </div>
        <div class="showinfo_wxcs_cf">
          <div class="swc_shen">
            <div class="swc_shen_label">财神</div>
            <div class="swc_shen_value">{{ dateinfo.caishenpos }}</div>
          </div>
          <div class="swc_shen">
            <div class="swc_shen_label">福神</div>
            <div class="swc_shen_value">{{ dateinfo.fushenpos }}</div>
          </div>
        </div>

        <div class="showinfo_wxcs_cf">
          <div class="swc_shen">
            <div class="swc_shen_label">喜神</div>
            <div class="swc_shen_value">{{ dateinfo.xishenpos }}</div>
          </div>
          <div class="swc_shen">
            <div class="swc_shen_label">阳贵</div>
            <div class="swc_shen_value">{{ dateinfo.yangguipos }}</div>
          </div>
        </div>

        <div class="pzbj">
          <div class="pzbj_til">彭祖百忌</div>
          <div class="pzbj_val">{{ dateinfo.pzbj }}</div>
        </div>
      </div>
    </div> -->
    
    <!-- 备案信息 -->
    <footer class="footer">
      <a 
        href="https://beian.miit.gov.cn/" 
        target="_blank"
        class="beian-link"
      >
        黔ICP备2025044569号-2
      </a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { Solar, SolarMonth, HolidayUtil, Lunar } from "lunar-typescript";
import weeklist from "@/utils/weeklist";
import { Overlay, Icon, Toast } from "vant";
import datePicker from "@/components/datepicker.vue";
import PickerDate from "@/components/kuipicker/picker-date/PickerDate.vue";
import { reactive, ref, watch } from "vue";
import { getYearWeek } from "../utils/getweeks";
import { useRouter } from "vue-router";
import { wuxingFirstCharMap, tiaohouMap } from "../config/wuxing";
import { getConstellationByDate } from "../config/constellation";
import { DateService } from '@/utils/date';

const showpicker = ref(false);
//固定年月,用于判断当前时间
let gdmonth = new Date().getMonth() + 1;
let gdyear = new Date().getFullYear();
//当前年月日,可随着选择变化
let nowyear = ref(new Date().getFullYear());
let nowmonth = ref(new Date().getMonth() + 1);
let nowdate = ref(new Date().getDate());

//当天实例
const todayins = Solar.fromDate(new Date());
//当前时辰
const nowtime = todayins.getLunar().getTimeInGanZhi();
//日历每月数据集,包含前月与后月基本部分数据
let datelist: any = ref([]);

/**
 * @description: 获取datelist
 * @param {number} nowyear
 * @param {number} nowmonth
 * @return {array}
 */
const getContent = (nowyear: any, nowmonth: any) => {
  var d = SolarMonth.fromDate(new Date(`${nowyear}/${nowmonth}/1`));
  const firstweek = d.getDays()[0].getWeek();
  const prefixdate = d
    .next(-1)
    .getDays()
    .slice(
      d.next(-1).getDays().length - firstweek,
      d.next(-1).getDays().length
    );

  const middate = d.getDays();
  const lastweek = d.getDays()[d.getDays().length - 1].getWeek();
  const enddate = d
    .next(1)
    .getDays()
    .slice(0, 6 - lastweek);

  return [...prefixdate, ...middate, ...enddate];
};
datelist.value = getContent(nowyear.value, nowmonth.value);

//是否调休
const isWork = (item: any) => {
  const d = HolidayUtil.getHoliday(
    item.getYear(),
    item.getMonth(),
    item.getDay()
  );

  return d?.isWork();
};

//选中日期,默认当天
const selectDate = ref(todayins);

const selectDay = async (item: any) => {
  selectDate.value = item;
  nowmonth.value = selectDate.value.getMonth();
  nowyear.value = selectDate.value.getYear();
  getDateInfo(item);
  datelist.value = getContent(nowyear.value, nowmonth.value);
  dateStr.value = `${dateType.value} ${selectDate.value.getYear()}-${selectDate.value.getMonth()}-${selectDate.value.getDay()} ${selectDate.value.getHour()}:00`;
  
  const user = localStorage.getItem('user');
  // 只有在用户已登录时才检查收藏状态
  if (user) {
    await checkIfDateFavorited();
  } else {
    // 用户未登录时，直接设置为未收藏状态
    isDateFavorited.value = false;
  }
};

/**获取选中天对应信息 */
const dateinfo = reactive<any>({
  yinli: "",
  ganzhiyear: "",
  ganzhimonth: "",
  weeks: 0,
  ganzhiday: "",
  ganzhihour: "", // 新增属性，存储时柱
  dayyi: [],
  dayji: [],
  wuxing: "",
  tiangan: "", // 新增属性，存储五行的最后一个字
  chongsha: "",
  zhishen: "",
  xishenpos: "",
  yangguipos: "",
  fushenpos: "",
  caishenpos: "",
  times: [],
  xingqi: "",
  pzbj: "",
});
const getDateInfo = (item: any) => {
  dateinfo.yinli =
    item.getLunar().getMonthInChinese() +
    "月" +
    item.getLunar().getDayInChinese();
  dateinfo.ganzhiyear =
    item.getLunar().getYearInGanZhi() +
    item.getLunar().getYearShengXiao() +
    "年";
  dateinfo.ganzhimonth = item.getLunar().getMonthInGanZhi();
  dateinfo.ganzhiday = item.getLunar().getDayInGanZhi();
  dateinfo.ganzhihour = item.getLunar().getTimeInGanZhi();
  dateinfo.weeks = getYearWeek(item.getYear(), item.getMonth(), item.getDay());
  dateinfo.dayyi = item.getLunar().getDayYi();
  dateinfo.dayji = item.getLunar().getDayJi();
  dateinfo.wuxing = item.getLunar().getDayNaYin();
  // 设置tiangan为ganzhiday的第一个字
  dateinfo.tiangan = dateinfo.ganzhiday.charAt(0);
  dateinfo.xingqi = item.getWeekInChinese();
  dateinfo.pzbj =
    item.getLunar().getPengZuGan() + " " + item.getLunar().getPengZuZhi();
  dateinfo.chongsha =
    item.getLunar().getDayShengXiao() +
    "日冲" +
    item.getLunar().getDayChongShengXiao();

  dateinfo.zhishen = item.getLunar().getDayTianShen();
  dateinfo.caishenpos = item.getLunar().getDayPositionCaiDesc();
  dateinfo.xishenpos = item.getLunar().getDayPositionXiDesc();
  dateinfo.yangguipos = item.getLunar().getDayPositionYangGuiDesc();
  dateinfo.fushenpos = item.getLunar().getDayPositionFuDesc();
  dateinfo.times = item.getLunar().getTimes();
  dateinfo.times.pop();
};
getDateInfo(todayins);
(window as any).dateinfo = dateinfo;

/**
 * @description: 正数为下一天,负数为上一天
 * @param {number} val
 * @return {*}
 */
const nextDay = (val: number) => {
  selectDate.value = selectDate.value.next(val);
  nowmonth.value = selectDate.value.getMonth();
  nowyear.value = selectDate.value.getYear();
  datelist.value = getContent(nowyear.value, nowmonth.value);
  selectDay(selectDate.value);
  // getDateInfo(selectDate.value);
};

// 保存日期类型（公历/农历）
const dateType = ref('公历');
const dateStr = ref(`公历 ${todayins.getYear()}-${todayins.getMonth()}-${todayins.getDay()} ${todayins.getHour()}:00`);


//选择时间
const confirm = (item: any) => {
  // 检查 item 是否为字符串（新组件返回的格式）
  if (typeof item === 'string') {
    dateStr.value = item;
    // 解析字符串格式的日期，格式如："公历 2025-7-28 11:40" 或 "农历 2025-7-28 11:40"
    const isLunar = item.startsWith('农历');
    // 更新日期类型
    dateType.value = isLunar ? '农历' : '公历';
    const dateMatch = item.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2})/);
    
    if (dateMatch) {
      const year = parseInt(dateMatch[1]);
      const month = parseInt(dateMatch[2]);
      const day = parseInt(dateMatch[3]);
      const hour = parseInt(dateMatch[4]);
      const minute = parseInt(dateMatch[5]);
      
      let solarDate;
      
      if (isLunar) {
        // 如果是农历，先创建 Lunar 对象，再转换为 Solar 对象
        try {
          const lunarDate = Lunar.fromYmdHms(year, month, day, hour, minute, 0);
          solarDate = lunarDate.getSolar();
          console.log('转换农历日期:', item, '转换结果:', solarDate.toString());
        } catch (error) {
          console.error('农历转换错误:', error);
          // 转换失败时使用当前日期
          solarDate = Solar.fromDate(new Date());
        }
      } else {
        // 公历直接创建 Solar 对象
        solarDate = Solar.fromYmdHms(year, month, day, hour, minute, 0);
      }
      
      // 更新选中日期
      selectDay(solarDate);
      selectDate.value = solarDate;
      nowmonth.value = solarDate.getMonth();
      nowyear.value = solarDate.getYear();
      datelist.value = getContent(nowyear.value, nowmonth.value);
      getDateInfo(solarDate);
    }
  } else {
    // 原有逻辑，处理 Solar 对象
    selectDay(item);
    selectDate.value = item;
    nowmonth.value = item.getMonth();
    nowyear.value = item.getYear();
    datelist.value = getContent(nowyear.value, nowmonth.value);
    getDateInfo(item);
    dateStr.value = `公历 ${selectDate.value.getYear()}-${selectDate.value.getMonth()}-${selectDate.value.getDay()} ${selectDate.value.getHour()}:00`;
  }
};

//回到今天
const backToToday = () => {
  confirm(todayins);
};

const isDateFavorited = ref(false);

// 检查当前日期是否已被收藏
const checkIfDateFavorited = async () => {
  try {
    // 这边是默认认为用户已登录 因为前面已经做过判断，如果没有登录的话，不会触发checkIfDateFavorited这个函数
    const user = JSON.parse(localStorage.getItem('user') ?? 'null');
    const userId = user.id;
    // 如果用户未登录，直接将收藏状态设为 false
    if (!user) {
      isDateFavorited.value = false;
      return;
    }
    
    const dateString = `${selectDate.value.getYear()}-${selectDate.value.getMonth()}-${selectDate.value.getDay()} ${selectDate.value.getHour()}:00:00`;
    isDateFavorited.value = await DateService.isDateFavorited(dateString, userId);
  } catch (error) {
    console.error('检查收藏状态错误:', error);
    isDateFavorited.value = false;
  }
};

const saveFavoriteDate = async () => {
  try {
    const user = localStorage.getItem('user');
    // 检查用户是否已登录
    if (!user) {
      Toast.fail('请先登录');
      router.push('/login');
      return;
    }

    const dateString = `${selectDate.value.getYear()}-${selectDate.value.getMonth()}-${selectDate.value.getDay()} ${selectDate.value.getHour()}:00:00`;
    
    const userId = JSON.parse(user).id;    
    if (isDateFavorited.value) {
      // 如果已收藏，执行取消收藏逻辑
      const collections = await DateService.getDateCollections(userId);
      const collection = collections.find(c => c.dateString === dateString);
      if (collection) {
        await DateService.deleteDate(collection._id);
      }
      Toast.success('已取消收藏');
    } else {
      // 如果未收藏，执行收藏逻辑
      await DateService.addDate({ dateString: dateString, userId: userId });
      Toast.success('收藏成功');
    }
    
    // 切换收藏状态
    isDateFavorited.value = !isDateFavorited.value;
  } catch (error: any) {
    console.error('保存收藏日错误:', error.response?.data || error.message);
    Toast.fail('操作失败，请重试');
    throw error;
  }
};

const router = useRouter();
const toselect = () => router.push("/select");

const state = reactive({
    active: Number(localStorage.getItem('tabbarActive')) || 0
});
// 监听路由变化，处理日期参数
watch(() => router.currentRoute.value.query, (query) => {
  if (query.date) {
    const [year, month, day] = query.date.split('-').map(Number);
    const solarDate = Solar.fromYmdHms(year, month, day, 0, 0, 0);
    selectDay(solarDate);
    selectDate.value = solarDate;
    nowmonth.value = solarDate.getMonth();
    nowyear.value = solarDate.getYear();
    datelist.value = getContent(nowyear.value, nowmonth.value);
    getDateInfo(solarDate);
    
    // 设置 jbottom 的 index 为 0
    state.active = 0;
    localStorage.setItem('tabbarActive', '0');
  }
}, { immediate: true });
</script>
<style lang="less" src="./Home.less"></style>
