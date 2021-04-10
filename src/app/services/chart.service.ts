import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

/*  private tagColorOrder: Array<string> = [
    'dv-basic-blue', 'dv-basic-orange', 'dv-basic-green', 'dv-basic-pink', 'dv-basic-brown', 'dv-basic-purple',
    'dv-basic-yellow', 'dv-basic-red', 'dv-basic-gray', 'dv-light-blue', 'dv-light-orange', 'dv-light-green',
    'dv-light-pink', 'dv-light-brown', 'dv-light-purple', 'dv-light-yellow', 'dv-light-red', 'dv-light-gray',
    'dv-dark-blue', 'dv-dark-orange', 'dv-dark-green', 'dv-dark-pink', 'dv-dark-brown', 'dv-dark-purple',
    'dv-dark-yellow', 'dv-dark-red'
  ];*/

  private dataVisColors: Array<string> = ['rgb(90, 191, 248)', 'rgb(226, 141, 23)', 'rgb(123, 188, 0)', 'rgb(166, 119, 239)', 'rgb(255, 160, 118)', 'rgb(97, 132, 255)', 'rgb(219, 106, 188)', 'rgb(77, 151, 139)', 'rgb(222, 67, 119)', 'rgb(101, 149, 64)', 'rgb(224, 84, 85)', 'rgb(72, 130, 168)', 'rgb(211, 200, 0)', 'rgb(122, 122, 122)', 'rgb(178, 145, 46)', 'rgb(130, 210, 251)', 'rgb(236, 175, 104)', 'rgb(146, 206, 64)', 'rgb(191, 158, 244)', 'rgb(242, 191, 159)', 'rgb(149, 167, 255)', 'rgb(227, 147, 210)', 'rgb(120, 186, 175)', 'rgb(223, 102, 155)', 'rgb(142, 180, 124)', 'rgb(229, 129, 137)', 'rgb(125, 167, 195)', 'rgb(225, 215, 94)', 'rgb(163, 163, 163)', 'rgb(202, 178, 114)', 'rgb(166, 223, 252)', 'rgb(242, 200, 154)', 'rgb(174, 220, 128)', 'rgb(210, 187, 249)', 'rgb(246, 212, 191)', 'rgb(185, 195, 255)', 'rgb(233, 180, 224)', 'rgb(174, 213, 207)', 'rgb(229, 148, 189)', 'rgb(176, 204, 166)', 'rgb(235, 169, 176)', 'rgb(168, 196, 214)', 'rgb(235, 227, 147)', 'rgb(204, 204, 204)', 'rgb(220, 202, 160)', 'rgb(59, 126, 164)', 'rgb(149, 92, 17)', 'rgb(79, 123, 0)', 'rgb(107, 76, 155)', 'rgb(157, 108, 78)', 'rgb(64, 86, 170)', 'rgb(144, 69, 123)', 'rgb(49, 94, 87)', 'rgb(145, 41, 72)', 'rgb(66, 98, 42)', 'rgb(144, 53, 55)', 'rgb(46, 84, 109)', 'rgb(138, 131, 0)', 'rgb(77, 77, 77)', 'rgb(116, 94, 31)', 'rgb(111, 201, 250)', 'rgb(233, 162, 75)', 'rgb(134, 198, 0)', 'rgb(180, 140, 242)', 'rgb(240, 179, 141)', 'rgb(128, 152, 255)', 'rgb(224, 129, 201)', 'rgb(93, 172, 159)', 'rgb(222, 82, 136)', 'rgb(123, 166, 98)', 'rgb(227, 110, 116)', 'rgb(103, 151, 184)', 'rgb(219, 209, 57)', 'rgb(143, 143, 143)', 'rgb(192, 164, 85)', 'rgb(153, 218, 251)', 'rgb(240, 191, 136)', 'rgb(164, 215, 107)', 'rgb(204, 177, 247)', 'rgb(244, 204, 180)', 'rgb(173, 185, 255)', 'rgb(231, 168, 219)', 'rgb(147, 200, 191)', 'rgb(226, 132, 178)', 'rgb(164, 196, 151)', 'rgb(233, 155, 163)', 'rgb(153, 186, 208)', 'rgb(232, 224, 130)', 'rgb(184, 184, 184)', 'rgb(214, 194, 143)', 'rgb(181, 229, 253)', 'rgb(244, 210, 173)', 'rgb(187, 226, 151)', 'rgb(217, 198, 249)', 'rgb(247, 219, 201)', 'rgb(197, 205, 255)', 'rgb(236, 191, 229)', 'rgb(201, 227, 223)', 'rgb(232, 165, 200)', 'rgb(189, 212, 181)', 'rgb(237, 182, 189)', 'rgb(182, 206, 221)', 'rgb(239, 232, 165)', 'rgb(224, 224, 224)', 'rgb(225, 211, 176)', 'rgb(47, 103, 135)', 'rgb(124, 77, 16)', 'rgb(64, 102, 0)', 'rgb(89, 64, 128)', 'rgb(129, 89, 64)', 'rgb(54, 72, 142)', 'rgb(119, 57, 102)', 'rgb(35, 67, 62)', 'rgb(120, 33, 60)', 'rgb(53, 80, 35)', 'rgb(120, 44, 46)', 'rgb(38, 69, 90)', 'rgb(115, 109, 0)', 'rgb(61, 61, 61)', 'rgb(96, 78, 26)', 'rgb(77, 164, 213)', 'rgb(196, 122, 20)', 'rgb(103, 159, 0)', 'rgb(140, 101, 203)', 'rgb(203, 140, 99)', 'rgb(82, 111, 218)', 'rgb(187, 90, 159)', 'rgb(62, 121, 111)', 'rgb(188, 56, 94)', 'rgb(85, 126, 54)', 'rgb(190, 71, 72)', 'rgb(62, 112, 145)', 'rgb(180, 171, 0)', 'rgb(102, 102, 102)', 'rgb(151, 123, 39)', 'rgb(36, 80, 105)', 'rgb(97, 60, 13)', 'rgb(50, 80, 0)', 'rgb(70, 50, 102)', 'rgb(101, 70, 50)', 'rgb(43, 58, 114)', 'rgb(96, 46, 82)', 'rgb(21, 40, 37)', 'rgb(95, 24, 48)', 'rgb(42, 64, 27)', 'rgb(97, 35, 37)', 'rgb(30, 55, 71)', 'rgb(89, 85, 2)', 'rgb(41, 41, 41)', 'rgb(76, 62, 20)'];// eslint-disable-line


  /**
   * returns the correct id for the series
   *
   */
  private _calcId(d, i): string {
    let id: string;
    if (d.id) {
      id = d.id;
    } else {
      id = 'y' + i;
    }
    return id;
  }

  public getTagsForTS(chart): Array<string> {
    return chart.tags.map((tag) => {
      return { tagId: tag.sourceKey };
    });
  }

  public getSeriesConfig(tsData: Array<any>): any {
    const seriesConfig = {};
    if (tsData && tsData.length) {
      let index = 0;
      for (const data of tsData) {
        seriesConfig[data.name] = {
          y: data.name,
          x: 'x',
          name: data.name,
          yAxisUnit: 'atm',
          color: this.getTagColor(index),
          mutedOpacity: 0
        };
        index++;
      }
    }
    console.log('seriesConfig %o', seriesConfig);
    return seriesConfig;
  }

  private getTagColor(colorIndex): string {
    const colIndex = colorIndex % this.dataVisColors.length;
    const color = this.dataVisColors[colIndex];
    return color;
  }

  public convertChartData(tsData: Array<any>): any {
    if (tsData && tsData.length) {
      const originalData = [];
      for (const data of tsData) {
        originalData.push({
          id: data.name,
          name: data.name,
          data: data.values
        });
      }


      if (originalData.length > 0) {
        // put in check to see if we have sorted data or not
        const chartData = [];
        const numArrs = originalData.length; // how many arrays we have
        const indexes = Array(numArrs).fill(0); // create starting index for each
        let iter = 0; // how many series we have reached the end
        const id = Array.prototype.map.call(originalData, function(d, i) {
          // add infinity to the end so we have a stop point
          d.data.push([Infinity, Infinity]);

          // figure out if we should use user input ID or the series key
          return this._calcId(d, i);
        }.bind(this));

        // keep going until we reach the end of each series
        while (iter < numArrs) {
          let lowest = Number.MAX_VALUE;  // Number.MAX_VALUE < Infinity
          let obj: any = {};       // our new merged data unit
          let indicies = [];  // which indexes got incremented
          iter = 0;       // reset iter with each pass

          for (let i = 0; i < numArrs; i++) {
            if (originalData[i].data[indexes[i]][0] < lowest) {
              // reset obj
              obj = {};
              // set our lowest for reference on the next pass
              lowest = originalData[i].data[indexes[i]][0];

              // set category for spiderWeb and parallel.
              /*if (originalData[i].category) {
                obj.category = originalData[i].category;
              }*/

              // The change is to handle quality data indicator separately for data table from other charts.
              // When the user chooses to see only good quality data, the data retrieved from the api has the
              // value set as null. In this case, the row in the data table should not be created. This is
              // changed from original implementation where the value column was blank and the time stamp &
              // quality indicatorare visible in the table. Fix DE90666
            /*  if (isTableData) {
                if (!_.isNull(originalData[i].data[indexes[i]][1])) {
                  // set our obj x value
                  obj.x = lowest;
                  obj[id[i]] = originalData[i].data[indexes[i]][1];
                  // Add Quality Indicators:
                  if (!_.isUndefined(obj[id[i]]) && !_.isUndefined(originalData[i].data[indexes[i]][2])) {
                    obj[id[i] + this.QUALITY_INDICATOR_KEY] = originalData[i].data[indexes[i]][2];
                  }
                }
              } else {*/
                // for any other chart, push the data irrespective of value being null.
              obj.x = lowest;
              obj[id[i]] = originalData[i].data[indexes[i]][1];
              // }
              // track in index we are at
              indicies = [i];
            } else if (originalData[i].data[indexes[i]][0] === lowest) {

             /* if (isTableData) {
                if (!_.isNull(originalData[i].data[indexes[i]][1])) {
                  obj[id[i]] = originalData[i].data[indexes[i]][1];
                }
                // Add Quality Indicators:
                if (!_.isUndefined(obj[id[i]]) && !_.isUndefined(originalData[i].data[indexes[i]][2])) {
                  obj[id[i] + this.QUALITY_INDICATOR_KEY] = originalData[i].data[indexes[i]][2];
                }
              } else {*/
              obj[id[i]] = originalData[i].data[indexes[i]][1];
              // }
              // add our index
              indicies.push(i);
            }
          }
          // add our new object to our data set if not empty
          if (obj) { chartData.push(obj); }

          // increment out indexes
          for (let j = 0; j < numArrs; j++) {
            // increase the index for any series we merged
            const k = indicies[j];
            indexes[k] += 1;

            // check to see we hit the end of each series, increment iter if we do
            if (originalData[j].data[indexes[j]][0] === Infinity) {
              iter += 1;
            }
          }
        }

        return chartData;
      }
      // else return empty array
      return [];
    }
  }


    public getRegisterConfig(): any {
        return {
            truncationLength: 14,
            type: "vertical",
            width: 200,
            firstDateTimeFormat: "hh:mm:ss.SSS ZZ",
            sortConfig: {
                "default": {
                    "name": "Tag Name",
                    "sortOnSeriesChange": "nameIgnoreCase",
                    "selected": "true"
                },
                "muted": {
                    "name": "Muted",
                    "sortOnSeriesChange": "muted"
                }
            }
        };
    }

    public getYAxisConfig(): any {
        return {
            "appendUnitInTitle": true,
            "tickFormat": "",
            "preventSeriesBar": true,
            "ticks": 10
        };
    }

    public getToolBarConfig(): any {
        return {
            "config": {
                "customZoom": {
                    "tooltipLabel": "Zoom",
                    "icon": "px-nav:search",
                    "buttonGroup": 1,
                    "selectable": true,
                    "actionConfig": {
                        "mousedown": "startZooming",
                        "mouseup": "stopZooming",
                        "mousemove": "calcTooltipData"
                    },
                    "subConfig": {
                        "x": {
                            "icon": "px-vis:x-axis",
                            "buttonGroup": 1,
                            "tooltipLabel": "Zoom on X axis only",
                            "selectable": true
                        },
                        "y": {
                            "icon": "px-vis:y-axis",
                            "buttonGroup": 1,
                            "tooltipLabel": "Zoom on Y axis only",
                            "selectable": true
                        },
                        "xy": {
                            "icon": "px-vis:xy-axis",
                            "buttonGroup": 1,
                            "selected": true,
                            "tooltipLabel": "Zoom on X and Y axis",
                            "selectable": true
                        },
                        "undoZoom": {
                            "icon": "px-vis:zoom-out-one-level",
                            "tooltipLabel": "Undo zoom",
                            "eventName": "px-vis-toolbar-undo-zoom"
                        },
                        "resetZoom": {
                            "icon": "px-vis:full-screen",
                            "tooltipLabel": "Reset zoom",
                            "eventName": "px-vis-toolbar-reset-zoom"
                        }
                    }
                },
                "pan": {
                    "actionConfig": {
                        "click": null
                    },
                    "tooltipLabel": "Pan",
                    "subConfig": {
                        "resetZoom": {
                            "tooltipLabel": "Reset panning"
                        }
                    }
                },
                "tooltip": {
                    "tooltipLabel": "Tooltip",
                    "icon": "px-vis:show-tooltip",
                    "cursorIcon": "px-vis:show-tooltip",
                    "buttonGroup": 1,
                    "selected": false,
                    "actionConfig": {
                        "mouseout": "resetTooltip",
                        "mousemove": "calcTooltipData",
                        "mousedown": null,
                        "mouseup": null
                    },
                    "subConfig": {
                        "timestamps": {
                            "title": "Timestamps",
                            "tooltipLabel": "Search for timestamps",
                            "buttonGroup": 2,
                            "selectable": true,
                            "selected": true
                        },
                        "points": {
                            "title": "Points",
                            "tooltipLabel": "Search for points",
                            "buttonGroup": 2,
                            "selectable": true
                        }
                    }
                }
            },
            "subToolbarAlignment": "above"
        };
    }



}
