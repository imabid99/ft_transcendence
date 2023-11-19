'use client';

import React from "react";
import axios from "axios";
import {
    useEffect,
    useState,
    useRef,
} from "react";
import axiosInstance from "./axiosInstance";


export function useAxiosGet(url: string){
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        error: false
    });

    useEffect(() => {
        setRequest({
            loading: true,
            data: null,
            error: false
        });
        axiosInstance.get(url)
            .then(response => {
                setRequest({
                    loading: false,
                    data: response.data,
                    error: false
                });
            })
            .catch(() => {
                setRequest({
                    loading: false,
                    data: null,
                    error: true
                });
            });
    }, [url]);

    return request;
} 

export function useAxiosPost(url: string, body: any){
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        error: false
    });

    useEffect(() => {
        setRequest({
            loading: true,
            data: null,
            error: false
        });
        axiosInstance.post(url, body)
            .then(response => {
                setRequest({
                    loading: false,
                    data: response.data,
                    error: false
                });
            })
            .catch(() => {
                setRequest({
                    loading: false,
                    data: null,
                    error: true
                });
            });
    }, [url, body]);

    return request;
}