/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-22 19:06:06
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-23 20:37:50
 */
export default interface ChartProps {
    key: string;
    option?: object | null;
    style: {
        width: string;
        height: string;
    };
    className?: string;
    onRender?(instance): void;
}