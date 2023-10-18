# Introducing x86 Memory Corruptions

1. Which of the following statements about memory management is true?

    * **A buffer overflow is a situation where data is written beyond the end of an allocated buffer.**
    * The x86 architecture inherently prevents all forms of memory corruption.
    * Memory segmentation is used in x86 to provide a flat memory model without any boundaries.
    * Stack canaries are a mechanism to protect the CPU from overheating due to excessive memory usage.

2. Which of the following best describes the primary purpose of Address Space Layout Randomization (ASLR) ?

    * ASLR ensures that memory addresses are always kept in sequential order for optimized performance.
    * ASLR is a mechanism to prevent software from accessing unauthorized regions of memory by assigning fixed addresses.
    * ASLR is primarily used to compress memory pages and save space.
    * **ASLR randomizes the base address of the stack, heap, and shared libraries each time a program is executed to make exploitation more difficult.**

3. How is the Structured Exception Handler (SEH) commonly utilized by attackers?

    * SEH is used to speed up the exploitation process by bypassing the need for precise memory address calculations.
    * **Overwriting the SEH chain can be an avenue for exploitation when direct buffer overflow methods are mitigated.**
    * Attackers use SEH to ensure that their malicious payloads are encrypted and undetectable by antivirus solutions.
    * SEH is employed by attackers to introduce intentional exceptions, forcing the system to halt and thereby making it more vulnerable.

4. How does the "Return to Libc" technique benefit attackers?

    * It allows attackers to execute arbitrary shellcode by directly injecting it into the libc library.
    * "Return to Libc" is a method for attackers to increase the speed and efficiency of their brute force attacks.
    * **The technique is used to bypass stack execution protections by leveraging existing legitimate code in libraries, such as libc.**
    * It provides attackers a mechanism to overwrite the libc library and replace it with a malicious version.

5. In the context of the buffer overflow vulnerability in the Seattle Lab Mail (SLmail) POP3 server on Windows, which of the following statements best describes the exploitation technique?

    * The vulnerability is exploited by sending an oversized username during the authentication process.
    * The main target of the overflow is to overwrite the local variables of the function.
    * **By overflowing the vulnerable buffer, one can overwrite the caller return address, leading to potential arbitrary code execution.**
    * The SLmail vulnerability primarily affects the email sending function and its attachments handling.

6. Which of the following best describes the heap?

    * A section of memory reserved for static variables that remain constant throughout the program's execution.
    * **A dynamically allocated section of memory where variables are allocated and deallocated at runtime, often used for large data structures.**
    * A memory region where the call stack is maintained, including function return addresses and local variables.
    * A protected memory region where operating system kernels store their critical data.

7. Which of the following describes a situation where out-of-bound reads can help attackers bypass address space layout randomization?

    * Buffer Overflow
    * Use after free
    * Invalid page fault
    * **Buffer Over-read**